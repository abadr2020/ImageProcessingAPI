import express from 'express';
import { query, validationResult } from 'express-validator';
import { resolve } from 'path';
import { fullImgs, getFullPath, getThumbPath, isfullImgExist, isThumbExist, resizeImg } from '../../../utilities/helpers';

// create images object from the router module
const images = express.Router();
// use express.json for response purposes
images.use(express.json());

// declare get endpoint on route /api/images
images.get(
    '/',
    [
        query('filename').optional().isString(),
        query('width').optional().isInt({ min: 0 }).withMessage('Width should be positive number!'),
        query('height').optional().isInt({ min: 0 }).withMessage('Height should be positive number!'),
    ],
    async (req: express.Request, res: express.Response): Promise<void> => {
        // validating query stringq
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // if validation fails, response with array of errors
            res.status(400).json({
                errors: errors.array(),
            });
        } else {// case query strings validated successfully
            // declare variables for expected query strings
            const filename = req.query.filename?.toString().trim();
            let height = req.query.height?.toString().trim();
            let width = req.query.width?.toString().trim();
            if (!filename) {
                // filename not provided at all, response with list of images available in library
                res.status(200).send('Available Images: (' + await fullImgs + ') Please input one of them');
            } else if (!width && !height) {
                // width and height not provided, serve Full image
                if (await isfullImgExist(filename as string)) { // check filename exist in library
                    // filename exist, return image
                    res.status(200).sendFile(resolve(getFullPath(filename as string)));
                } else {
                    // filename doesn't exist
                    res.status(404).json('No such filename.');
                }
            } else {
                if (!width && height) {
                    // width not provided, set it to height
                    width = height;
                } else if (!height && width) {
                    // height not provided, set it to width
                    height = width;
                }
                if (await isfullImgExist(filename as string)) { // check filename exist in library
                    if (await isThumbExist(filename as string, height as string, width as string)) { // check thumbnail created before
                        // return with cached thumbnail
                        res.status(200).sendFile(resolve(getThumbPath(filename as string, height as string, width as string)));
                    } else {
                        // create thumbnail
                        const result = await resizeImg(filename as string, height as string, width as string);
                        if (result != '') {
                            // thumbnail created successfuly
                            res.status(200).sendFile(resolve(result));
                        } else {
                            // thumbnail creation failed
                            res.status(500).json('Something Went Wrong !!');
                        }
                    }
                } else {
                    // filename dosen't exist
                    res.status(404).json('No such filename.');
                }
            }
        }
    }
);

export default images;

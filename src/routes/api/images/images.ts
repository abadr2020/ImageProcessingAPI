import express from 'express';
import { query, validationResult } from 'express-validator';
import { resolve } from 'path';
import { fullImgs, getFullPath, getThumbPath, isfullImgExist, isThumbExist, resizeImg } from '../../../utilities/helpers';

const images = express.Router();
images.use(express.json());
images.get(
    '/',
    [
        query('filename').optional().isString(),
        query('width').optional().isInt({ min: 0 }).withMessage('Width should be positive number!'),
        query('height').optional().isInt({ min: 0 }).withMessage('Height should be positive number!'),
    ],
    async (req: express.Request, res: express.Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
            });
        } else {
            const filename = req.query.filename?.toString().trim();
            let height = req.query.height?.toString().trim();
            let width = req.query.width?.toString().trim();
            if (!filename) {
                res.status(200).send('Available Images: (' + fullImgs + ') Please input one of them');
            } else if (!width && !height) {
                // Serve Full image
                if (await isfullImgExist(filename as string)) {
                    res.status(200).sendFile(resolve(getFullPath(filename as string)));
                } else {
                    res.status(404).json('No such filename.');
                }
            } else {
                if (!width && height) {
                    width = height;
                } else if (!height && width) {
                    height = width;
                }
                if (await isfullImgExist(filename as string)) {
                    if (await isThumbExist(filename as string, height as string, width as string)) {
                        res.status(200).sendFile(resolve(getThumbPath(filename as string, height as string, width as string)));
                    } else {
                        const result = await resizeImg(filename as string, height as string, width as string);
                        if (result != '') {
                            res.status(200).sendFile(resolve(result));
                        } else {
                            res.status(500).json('Something Went Wrong !!');
                        }
                    }
                } else {
                    res.status(404).json('No such filename.');
                }
            }
        }
    }
);

export default images;

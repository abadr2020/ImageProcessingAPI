import fs from 'fs';
import { resizeImg } from '../../utilities/helpers';

describe('Testing Resize Image', () => {
    it('expect image to be resized and added to thumb folder', async () => {
        const path = await resizeImg('fjord', '1000', '400');
        const response = await fs.promises.stat(path).catch(e => false);
        expect(response).not.toBe(false);
        await fs.promises.unlink(path);
    });
});

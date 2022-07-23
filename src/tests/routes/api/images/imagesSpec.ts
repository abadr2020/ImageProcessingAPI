import app from '../../../../index';
import images from '../../../../routes/api/images/images';
import supertest from 'supertest';
import fs from 'fs';



const request = supertest(app);

describe('Test endpoint response', () => {
    it('gets images api endpoint', async () => {
        const response = await request.get('/');
        expect([200, 302]).toContain(response.status);
    });
    it('gets images api endpoint with image name provided', async () => {
        const response = await request.get('/api/images?filename=fjord');
        expect([200, 302]).toContain(response.status);
    });
    it('gets images api endpoint with image name, width and height are provided', async () => {
        const response = await request.get('/api/images/?filename=fjord&width=200&height=200');
        expect([200, 302]).toContain(response.status);
        await fs.promises.unlink('./assets/thumb/fjord_200_200.jpg');
    });
});

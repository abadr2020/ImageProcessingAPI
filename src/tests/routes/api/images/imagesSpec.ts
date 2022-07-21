import app from '../../../../index';
import supertest from 'supertest';

const request = supertest(app);
describe('Test endpoint response', () => {
    it('gets images api endpoint', async () => {
        const response = await request.get('/');
        console.log(response);
        expect([200, 302]).toContain(response.status);
    });
});

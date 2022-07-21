import express from 'express';
import images from './routes/api/images/images';

const app = express();
const port = 3500;

app.use('/api/images', images);

app.get('/', (req, res) => {
    res.redirect('/api/images');
});

app.get('/test', (req, res) => {
    res.send('/api/images');
});

app.listen(port, () => {
    console.log('Server is running on port 3500');
});

export default app;

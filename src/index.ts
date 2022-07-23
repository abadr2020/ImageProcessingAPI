import express from 'express';
import images from './routes/api/images/images';

// create app object from the express module
const app = express();
// use port 3500 to listen 
const port = 3500;
// use routes defined in images router
app.use('/api/images', images);
// declare an endpoint for the root path
app.get('/', (req: express.Request, res:express.Response): void  => {
    // redirect to the /api/images path
    res.redirect('/api/images');
});
// listen to port 3500 
app.listen(port, () => {
    console.log('Server is running on port 3500');
});

export default app;

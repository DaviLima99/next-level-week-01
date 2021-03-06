import express from 'express';
import cors from 'cors';
import routes from './routes';
import path from 'path';
import { errors } from 'celebrate';
import setupRoutes from './config/routing';

const app = express();

app.use(cors());
app.use(express.json());
// app.use(routes);
setupRoutes(app);

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

app.use(errors());

app.listen(4000, () => {
  console.log("Ecoleta app is running!");
});
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middleware/globalErrorhandler';
import notFound from './app/middleware/notFound';
import { AuthRoutes } from './app/modules/auth/auth.routes';
import { RepairRoutes } from './app/modules/carRepair/carRepair.routes';
import { GarageRoutes } from './app/modules/garages/garage.routes';
import { PartRoutes } from './app/modules/parts/parts.routes';
import { UserRoutes } from './app/modules/user/user.routes';

const app: Application = express();

//parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    // origin: 'https://basfinder-frontend.vercel.app',
    origin: 'http://localhost:3000',

    credentials: true,
  }),
);

// application routes

app.use('/api/user', UserRoutes);
app.use('/api/repair', RepairRoutes);
app.use('/api/garage', GarageRoutes);
app.use('/api/part', PartRoutes);

app.use('/api/auth', AuthRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Server Running');
});

app.use(globalErrorHandler);

//Not Found
app.use(notFound);

export default app;

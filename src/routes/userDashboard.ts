import express from 'express';
import { DashboardController } from '../controller/user/dashboard';
import { authenticateUser } from '../middlewares/userAuthMiddleware';


const router = express.Router();

router.get('/dashboard', authenticateUser, DashboardController.getDashboardData);


export { router as dashboardRoute };
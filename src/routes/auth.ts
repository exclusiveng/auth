import express from 'express';
import {registerUser} from '../controller/auth/register';
import {loginController} from '../controller/auth/login';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginController.loginUser);

export { router as AuthRoute };
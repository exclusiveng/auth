import {Request, Response, NextFunction} from 'express';
import {AppDataSource} from '../../database/dataSource';
import {User} from '../../entities/User';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';




export class loginController {
  public static async loginUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const {email, password} = req.body;

      if (!email || !password) {
        res.status(400).json({message: 'Email and password are required'});
        return;
      }

      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOneBy({email});

      if (!user) {
        res.status(404).json({message: 'User not found'});
        return;
      }

      const isPasswordValid =
        user.password && typeof user.password === 'string'
          ? await bcryptjs.compare(password, user.password)
          : false;
      if (!isPasswordValid) {
        res.status(401).json({message: 'Invalid password'});
        return;
      }

      const token = jwt.sign({id: user.id}, process.env.JWT_SECRET || 'secret', {
        expiresIn: '1h',
      });

      res.status(200).json({
        message: 'Login successful',
        token,
        user: {id: user.id, name: user.name, email: user.email},
      });
    } catch (error) {
      console.error('Error logging in user:', error);
      res.status(500).json({message: 'Internal server error'});
    }
  }
}
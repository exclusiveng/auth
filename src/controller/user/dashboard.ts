import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../../database/dataSource";
import { User } from "../../entities/User";

interface AuthRequest extends Request {
  user?: any; 
}

export class DashboardController {
  public static async getDashboardData(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = req.user?.id; // Assuming user ID is stored in req.user

      if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOneBy({ id: userId });

      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      res.status(200).json({
        message: "Dashboard data retrieved successfully",
        user: { id: user.id, name: user.name, email: user.email },
      });
    } catch (error) {
      console.error("Error retrieving dashboard data:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

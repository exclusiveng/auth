import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../../database/dataSource";
import { User } from "../../entities/User";
import bcryptjs from "bcryptjs";

export const registerUser: (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void> = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const userRepository = AppDataSource.getRepository(User);
    const existingUser = await userRepository.findOneBy({ email });

    if (existingUser) {
      res.status(409).json({ message: "User already exists" });
      return;
    }

    const newUser = userRepository.create({
      name,
      email,
      password: hashedPassword,
    });
    await userRepository.save(newUser);

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

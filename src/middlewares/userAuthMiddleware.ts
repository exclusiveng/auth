import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
    user?: any;
}

export const authenticateUser = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        res.status(401).json({ message: "No token provided" });
        return;
    }

    jwt.verify(token, "secret", (err, decoded) => {
        if (err) {
            res.status(403).json({ message: "Invalid token" });
            return;
        }

        req.user = decoded;
        next();
    });
}
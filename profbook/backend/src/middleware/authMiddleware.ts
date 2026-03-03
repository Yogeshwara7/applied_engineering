import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        role: string;
      };
    }
  }
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
     const authHeader = req.headers.authorization;

  if(!authHeader || !authHeader.startsWith("Bearer")){
    return res.status(401).json({message:"No token provided"})
  }

  const token= authHeader.replace("Bearer " ,"");

const decode = jwt.verify(token, process.env.JWT_SECRET as string) as {
userId:string;
role:string;
};

    req.user = {
        userId:decode.userId,
        role:decode.role
    };

    next();
  } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
  }
};

export const professorMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.user?.role !== "professor") {
    return res.status(403).json({ message: "Access denied. Professors only." });
  }

  next();

};

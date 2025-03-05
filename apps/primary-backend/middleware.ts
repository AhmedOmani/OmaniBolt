import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    //Maybe it could be something like this:
    //const token = req.headers.authorization; //Bearer token
    console.log("saba7 ela7a");
    const authHeader = req.headers.authorization; //Bearer token
    const token = authHeader && authHeader?.split(" ")[1];
    try {
        if (!token) {
            res.status(401).json({error: "Unauthorized"});
            return;
        }

        const decoded = jwt.verify(token, process.env.JWT_PUBLIC_KEY!, {
            algorithms: ["RS256"]
        });
        if (!decoded.sub) {
            res.status(401).json({error: "Unauthorized"});
            return;
        }

        const userId = (decoded as any).sub;
        if (!userId) {
            res.status(401).json({error: "Unauthorized"});
            return;
        }
        req.userId = userId;
        console.log("saba7 ela7a2");
        next();
    } catch(error) {
        
    }
}
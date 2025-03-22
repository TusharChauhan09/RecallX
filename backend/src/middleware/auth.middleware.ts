import { NextFunction , Request , Response } from "express";
import Jwt  from "jsonwebtoken";
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const authMiddleware = (req:Request , res: Response, next: NextFunction ) : void =>{
    try{
        const token = req.cookies.token;
        if(!token){
             res.status(401).json({
                message: "Unauthorized--No Token Provided"
            });
            return;
        }

        const check = Jwt.verify(token,JWT_SECRET!);
        if(!check){
            res.status(401).json({
                message: "Unauthorized--Token Invalid"
            })
            return
        }

        //@ts-ignore
        req.userId = check.userid;  //userId in db table and  userid during jwt sign
        next();
    }
    catch(error: any){
        console.log("Error in auth middleware: ",error.message);

         res.status(500).json({
            message: "Internal Error"
        })
        return;
    }
}
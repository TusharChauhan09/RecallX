import { Response } from 'express';
import mongoose , { ObjectId } from 'mongoose';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET ;

export const genToken = (userid  : mongoose.Types.ObjectId  , res : Response ) =>{
    const token = jwt.sign({userid} , JWT_SECRET! ,{
        expiresIn: "7d"
    } );

    res.cookie("token",token,{
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
        httpOnly: true,  //prevents XSS attacks aross-sites scripting attacks
        sameSite: "strict", // CSRF attacks cross-site request forgery attacks
        secure: process.env.NODE_ENV !== "development"
    });

    return token;
}
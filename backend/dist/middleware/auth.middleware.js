"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET;
const authMiddleware = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            res.status(401).json({
                message: "Unauthorized--No Token Provided"
            });
            return;
        }
        const check = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        if (!check) {
            res.status(401).json({
                message: "Unauthorized--Token Invalid"
            });
            return;
        }
        //@ts-ignore
        req.userId = check.userid; //userId in db table and  userid during jwt sign
        next();
    }
    catch (error) {
        console.log("Error in auth middleware: ", error.message);
        res.status(500).json({
            message: "Internal Error"
        });
        return;
    }
};
exports.authMiddleware = authMiddleware;

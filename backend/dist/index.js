"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const zod_1 = require("zod");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const users_model_1 = require("./models/users.model");
const db_1 = require("./lib/db");
const token_1 = require("./lib/token");
const auth_middleware_1 = require("./middleware/auth.middleware");
const contents_model_1 = require("./models/contents.model");
const app = (0, express_1.default)();
dotenv_1.default.config();
const PORT = process.env.PORT;
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
// signup route
app.post('/api/v1/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const requiredBody = zod_1.z.object({
        username: zod_1.z.string().min(3).max(100),
        password: zod_1.z.string().min(3).max(20)
    });
    const parseBodyWithSuccess = requiredBody.safeParse(req.body);
    if (!parseBodyWithSuccess.success) {
        return res.status(402).json({
            message: "Incorrect input format",
            error: parseBodyWithSuccess.error
        });
    }
    const { username, password } = parseBodyWithSuccess.data;
    try {
        const salt = yield bcryptjs_1.default.genSalt(10);
        const passwordHashed = yield bcryptjs_1.default.hash(password, salt);
        yield users_model_1.Users.create({
            username: username,
            password: passwordHashed
        });
        return res.json({
            message: "User signed up",
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Server error!!!"
        });
        console.log("error in signup controller", error.message);
    }
}));
// signin route
app.post('/api/v1/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const requiredBody = zod_1.z.object({
        username: zod_1.z.string().min(3).max(100),
        password: zod_1.z.string().min(3).max(20)
    });
    const parseBodyWithSuccess = requiredBody.safeParse(req.body);
    if (!parseBodyWithSuccess.success) {
        return res.status(402).json({
            message: "Incorrect input format",
            error: parseBodyWithSuccess.error
        });
    }
    const { username, password } = parseBodyWithSuccess.data;
    try {
        const user = yield users_model_1.Users.findOne({ username: username });
        if (!user) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }
        const passwordCheck = yield bcryptjs_1.default.compare(password, user.password);
        if (!passwordCheck) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }
        const token = (0, token_1.genToken)(user._id, res);
        return res.status(201).json({
            _id: user._id,
            username: user.username,
            password: user.password,
            token: token,
        });
    }
    catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}));
app.use(auth_middleware_1.authMiddleware);
// post content route 
app.post('/api/v1/content', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { link, type } = req.body;
        // @ts-ignore
        const userId = req.userId;
        yield contents_model_1.Content.create({
            link,
            type,
            userId,
            tags: []
        });
        res.status(200).json({
            message: "Contents added"
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "An error occurred while adding content"
        });
    }
}));
// get content route
app.get('/api/v1/content', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const userId = req.userId;
    const content = yield contents_model_1.Content.find({
        userId: userId
        // populate() : to bring all the data of the userId  and select: just username if not mention then all content selected
    }).populate({
        path: "userId",
        select: "username password"
    });
    res.status(200).json({
        message: content
    });
}));
// delete content route 
app.delete('/api/v1/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contentId = req.body.contentId;
    yield contents_model_1.Content.deleteOne({
        contentId,
        // @ts-ignore
        userId: req.userId
    });
}));
// post / share brain route 
app.post('/api/v1/brain/share', (req, res) => {
});
// post / share using id route 
app.get('/api/v1/brain/:shareLink', (req, res) => {
});
app.listen(PORT, () => {
    console.log("listening on PORT : " + PORT);
    (0, db_1.connectDB)();
});

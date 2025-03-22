"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const mongoose_1 = require("mongoose");
const UsersSchema = new mongoose_1.Schema({
    username: { type: String, unique: true },
    password: String
});
exports.Users = (0, mongoose_1.model)('Users', UsersSchema);

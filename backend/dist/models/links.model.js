"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Links = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const linksSchema = new mongoose_2.Schema({
    hash: {
        type: String,
    },
    userId: {
        type: mongoose_1.default.Types.ObjectId, ref: 'Users',
        required: true,
        unique: true
    },
});
exports.Links = (0, mongoose_2.model)("Links", linksSchema);

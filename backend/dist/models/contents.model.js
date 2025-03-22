"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Content = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const ContentSchema = new mongoose_2.Schema({
    title: {
        type: String,
    },
    link: {
        type: String
    },
    tags: [{
            type: mongoose_1.default.Types.ObjectId,
            ref: 'Tag'
        }],
    userId: {
        type: mongoose_1.default.Types.ObjectId, ref: 'Users',
        required: true
    }
});
exports.Content = (0, mongoose_2.model)("Content", ContentSchema);

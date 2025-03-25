import mongoose from "mongoose";
import { model, Schema, ObjectId } from "mongoose";

const linksSchema = new Schema({
    hash: {
        type: String,
    },
    userId: {
        type: mongoose.Types.ObjectId, ref:'Users',
        required: true,
        unique: true
    },
})

export const Links = model("Links",linksSchema);
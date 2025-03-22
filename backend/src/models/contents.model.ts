import mongoose from "mongoose";
import { model, Schema, ObjectId } from "mongoose";

const ContentSchema = new Schema({
    title: {
        type: String,
    },
    link: { 
        type: String
    },
    tags: [{
        type : mongoose.Types.ObjectId,
        ref: 'Tag'
    }],
    userId: {
        type: mongoose.Types.ObjectId, ref:'Users',
        required: true
    }
})

export const Content = model("Content",ContentSchema);
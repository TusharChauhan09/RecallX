import { model, Schema, ObjectId } from "mongoose";

const UsersSchema = new Schema({
    username: {type:String , unique:true},
    password : String 
});

export const Users = model('Users', UsersSchema);
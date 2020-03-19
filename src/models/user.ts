import mongoose, { model } from "mongoose";
import { IUserModel, IUserDocument, IUser } from "../interfaces";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    password: {
        type: String,
        required: true,
        max: 10,
        min: 6
    },
    username: {
        type: String,
        required: true,
        max: 14,
        min: 6
    },
    date: {
        type: Date,
        default: Date.now
    }
})

export const User: IUserModel = model<IUser, IUserModel>('User', userSchema)
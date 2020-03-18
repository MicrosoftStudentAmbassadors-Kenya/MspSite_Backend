import { Document, Model } from "mongoose";

export interface IUserDocument extends Document {
    username: string;
    email: string;
    password: string,
    date?: Date
}

export interface IUser extends IUserDocument {
    //have all methods defined here
}
export interface IUserModel extends Model<IUser> {
    // have static defined here

}
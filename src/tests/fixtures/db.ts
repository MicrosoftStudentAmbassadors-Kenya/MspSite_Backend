import mongoose from "mongoose"
import { User } from "../../models/user"
import hashPassword from "../../utils/hashpassword"

export const UserOneId = new mongoose.Types.ObjectId()
export const UserTwoID = new mongoose.Types.ObjectId()
export const UserThreeID = new mongoose.Types.ObjectId()


export const users = [
    {
        _id: UserThreeID,
        username: "novakdddd254",
        password: "aubameyang",
        email: "psde@gmail.com"
    },
    {
        _id: UserTwoID,
        username: "novddak254",
        password: "noddvak254",
        email: "pessa@gmail.com"
    },
    {
        _id: UserOneId,
        username: "novaasddk254",
        password: "novadsdsaak254",
        email: "pdasdasde@gmail.com"
    }

]
export const setUpDatabase = async () => {

    try {
        await new User({
            ...users[0],
            password: await hashPassword(10, users[0].password)
        }).save()
        await new User({
            ...users[1],
            password: await hashPassword(10, users[1].password)
        }).save()
        await new User({
            ...users[2],
            password: await hashPassword(10, users[2].password)
        }).save()
    } catch (error) {

    }
}
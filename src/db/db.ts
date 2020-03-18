import mongoose from "mongoose";

const connectToDB = async () => {

    await mongoose.connect(process.env.DB_URL,
        {
            useUnifiedTopology: true,
            useNewUrlParser: true
        },
        () => {
            console.log("connect to db")
        }
    )
}

export default connectToDB;
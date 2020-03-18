import express from "express";
import authRoute from "./routes/auth"
import db from "./db/db"
import dotenv from "dotenv"

dotenv.config()

db().then(() => console.log("connected...")).catch((error) => console.log(error))

const app: any = express()


app.use(express.json())
// Route middlewares
app.use('/api/user', authRoute)

app.listen(3000, () => console.log("server is running.."))
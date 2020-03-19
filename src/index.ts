import express from "express";
import authRoute from "./routes/auth"
import db from "./db/db"
import dotenv from "dotenv"

dotenv.config()

db().then(() => console.log("connected...")).catch((error) => console.log(error))

const app: any = express()

const port = process.env.PORT || 3000

app.use(express.json())
// Route middlewares
app.use(authRoute)

if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => console.log("server is running.."))
}



export default app
import jwt from "jsonwebtoken"

const auth = (req, res, next) => {
    const token = req.header("Bearer")
    if (!token) return res.status(401).send("Access denied..")

    try {
        const verified = jwt.verify(token, process.env.JWT_SIGN)
        req.user = verified
        next()
    } catch (error) {
        res.status(400).send('Invalid token')
    }

}
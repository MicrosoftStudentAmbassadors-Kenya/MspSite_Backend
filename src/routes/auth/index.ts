import { Router } from "express";
import { User } from "../../models/user"
import { registerValidation, loginValidation } from "../../utils/validation";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const router = Router()


router.post('/register', async (req, res) => {

    //validation
    const { error } = registerValidation(req.body)
    if (error) return res.status(400).send({ "error": error.details[0].message })

    const { email } = req.body;

    //check user in db
    const emailExists = await User.findOne({ email })
    if (emailExists) return res.status(400).send({ "error": "email already exists" })

    // hash pasword
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    //create user
    const user = await new User({ ...req.body, password: hashedPassword })



    try {
        const savedUser = await user.save()
        res.send({ user: savedUser })
    } catch (error) {
        res.send({ error })
    }

})

router.post('/login', async (req, res) => {

    const { email } = req.body;

    const { error } = loginValidation(req.body)
    if (error) return res.status(400).send({ "error": error.details[0].message })

    const user = await User.findOne({ email })
    if (!user) return res.status(400).send({ error: "Email or password is wrong" })

    const { password } = user;

    //password is correct
    const validPassword = await bcrypt.compare(req.body.password, password);
    if (!validPassword) return res.status(400).send({ error: "invalid password" })

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SIGN)
    res.header('Bearer', token);

    res.send({
        token
    })

})

export default router
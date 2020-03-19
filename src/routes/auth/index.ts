import { Router } from "express";
import { User } from "../../models/user"
import { registerValidation, loginValidation } from "../../utils/validation";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import hashPassword from "../../utils/hashpassword";

const router = Router()


router.post('/api/user/register', async (req, res) => {

    //validation
    const { error } = registerValidation(req.body)
    if (error) return res.status(400).send({ "error": error.details[0].message })

    const { email } = req.body;

    //check user in db
    const emailExists = await User.findOne({ email })
    if (emailExists) return res.status(400).send({ "error": "email already exists" })

    // hash pasword
    const hashedPassword = await hashPassword(10, req.body.password)
    //create user
    const user = await new User({ ...req.body, password: hashedPassword })



    try {
        const savedUser = await user.save()
        res.status(201).send({ user: savedUser })
    } catch (error) {
        res.send({ error })
    }

})

router.post('/api/user/login', async (req, res) => {

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
import { setUpDatabase, users } from "../fixtures/db"
import { User } from "../../models/user"
import request from "supertest"
import app from "../../index"


beforeEach(setUpDatabase)

afterEach(async () => {
    await User.deleteMany({})
})

test('should register a user', async () => {
    const user = {
        email: "bony@gmail.com",
        password: "novak@254",
        username: "dhjhsdhdkss"
    }

    const responsee = await request(app)
        .post('/api/user/register')
        .send(user)
        .expect(201)
    const createdUser = await User.findById(responsee.body.user._id)
    expect(createdUser).not.toBeNull()
})

test('should login a user', async () => {
    const responsee = await request(app)
        .post('/api/user/login')
        .send({
            email: users[2].email,
            password: users[2].password
        }).expect(200)
    expect(responsee.body).not.toBeNull()
})



import bcyrpt from "bcryptjs"

const hashPassword = async (salt: number, password: string) => {
    const passSalt = await bcyrpt.genSalt(salt)
    return await bcyrpt.hash(password, passSalt)
}

export default hashPassword;
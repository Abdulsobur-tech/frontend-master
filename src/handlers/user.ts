import { hashPassword, createJWT, comparePassword } from './../modules/auth';
import prisma from "../db"


export const createNewUser = async (req, res) => {
    const user = await prisma.user.create({
        data: {
            username: req.body.username,
            password: await hashPassword(req.body.password)
        }
    })
    const token = createJWT(user)
    res.json({ token: token })
}

export const signin = async (req, res) => {
    const user = await prisma.user.findUnique({
        where: {
            username: req.body.username,
        }
    })
    const isVlid = await comparePassword(req.body.password, user.password)
    if (!isVlid) {
        res.status(401)
        res.json({ message: "Nope" })
        return
    }
    const token = createJWT(user)
    res.json({ token: token })
}
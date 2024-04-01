import { Request, Response } from "express"
import { Users } from "../../db/mongodb/connect"
import { User } from "./user"

export const createUserRoute = async (req: Request, res: Response) => {
    const newUser: User = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
    }
    await Users.insertOne(newUser)
    res.sendStatus(200)
}
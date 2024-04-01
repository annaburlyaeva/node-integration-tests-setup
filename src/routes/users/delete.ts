import { Request, Response } from "express"
import { Users } from "../../db/mongodb/connect"

export const deleteUserRoute = async (req: Request, res: Response) => {
    await Users.deleteOne({email: req.query.email})
    res.sendStatus(200)
}
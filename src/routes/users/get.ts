import { Request, Response } from "express"
import { Users } from "../../db/mongodb/connect"

export const getUsersRoute = async (req: Request, res: Response) => {
  const users = await Users.find({ email: req.query.email }).toArray()
  res.status(200).send(users)
}


import { Router } from "express"
import { getUsersRoute} from "./get"
import { createUserRoute } from "./create"
import { deleteUserRoute } from "./delete"

export const usersRouter = Router()

usersRouter.post("/create", createUserRoute)
usersRouter.get("/get", getUsersRoute)
usersRouter.delete("/delete", deleteUserRoute)

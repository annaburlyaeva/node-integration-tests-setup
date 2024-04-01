import { Router } from "express"
import { getOrdersRoute } from "./get"
import { createOrderRoute } from "./create"
import { deleteOrderRoute } from "./delete"

export const ordersRouter = Router()

ordersRouter.post("/create", createOrderRoute)
ordersRouter.get("/get", getOrdersRoute)
ordersRouter.delete("/delete", deleteOrderRoute)

import { Request, Response } from "express"
import { Order } from "./order"
import { PoolConnection } from "mysql2/typings/mysql/lib/PoolConnection"
import { getPoolConnection } from "../../db/mysql/connect"

const createOrder = async (
  conn: PoolConnection,
  newOrder: Omit<Order, "order_id">
): Promise<null> => {
  return new Promise(function (resolve, reject) {
    conn.execute(
      `INSERT INTO orders (customer_id, price, quantity) VALUES (${Object.values(newOrder).join(", ")})`,
      (err, _rows, _fields) => {
        if (err) {
          return reject(err)
        }
        resolve(null)
      }
    )
  })
}

export const createOrderRoute = async (req: Request, res: Response) => {
  const newOrder: Order = req.body.new_order

  getPoolConnection(async (conn) => {
    createOrder(conn, newOrder)
      .then(() => {
        return res.sendStatus(200)
      })
      .catch((err) => {
        console.error(err)
        return res.sendStatus(500)
      })
  })
}
import { Request, Response } from "express"
import { PoolConnection } from "mysql2"
import { Order } from "./order"
import { getPoolConnection } from "../../db/mysql/connect"

const getOrders = (
    conn: PoolConnection
  ): Promise<Order[]> => {
    return new Promise((resolve, reject) => {
      conn.execute(
        `SELECT * FROM orders`,
        (err: any, rows: any[], _fields: any[]) => {
          if (err) {
            return reject(err)
          }
          return resolve(
            rows.map((row) => {
              const order: Order = {
                order_id: row.order_id,
                customer_id: row.customer_id,
                price: row.price,
                quantity: row.quantity,
              }
              return order
            })
          )
        }
      )
    })
  }

export const getOrdersRoute = async (_req: Request, res: Response) => {
    getPoolConnection(async (conn) => {
      getOrders(conn)
        .then((orders) => {
          return res.status(200).send(orders)
        })
        .catch((err) => {
          console.error(err)
          return res.sendStatus(500)
        })
    })
}
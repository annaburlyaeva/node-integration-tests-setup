import { Request, Response } from "express"
import { PoolConnection } from "mysql2/typings/mysql/lib/PoolConnection"
import { getPoolConnection } from "../../db/mysql/connect"

const deleteOrder = async (
    conn: PoolConnection,
    orderId: number
  ): Promise<boolean> => {
    return new Promise(function (resolve, reject) {
      conn.execute(
        "DELETE FROM orders WHERE order_id = " + orderId,
        (err, _rows, _fields) => {
          if (err) {
            return reject(err)
          }
          resolve(true)
        }
      )
    })
  }

export const deleteOrderRoute = async (req: Request, res: Response) => {
  const orderId: number = parseInt(req.query.order_id as string)
  getPoolConnection(async (conn) => {
    deleteOrder(conn, orderId)
      .then(() => {
        res.sendStatus(200)
      })
      .catch((err) => {
        console.error(err)
        res.sendStatus(500)
      })
  })
}
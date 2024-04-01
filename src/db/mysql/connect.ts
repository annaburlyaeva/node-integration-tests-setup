import mysql from "mysql2"
import { PoolConnection } from "mysql2/typings/mysql/lib/PoolConnection"

export const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
  dateStrings: true,
})

export const getPoolConnection = async (
  func: (conn: PoolConnection) => Promise<any>
) => {
  var gotConnection = false
  setTimeout(() => {
    if (!gotConnection) {
      throw "connection not established after timeout."
    }
  }, 1500)
  pool.getConnection(async (err, conn) => {
    if (err) {
      console.error(err)
      conn.release()
      return
    }

    gotConnection = true
    await func(conn)
    conn.release()
  })
}
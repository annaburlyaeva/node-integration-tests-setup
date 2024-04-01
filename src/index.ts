import express from "express"
import { connect } from "./db/mongodb/connect"
import { PoolConnection } from "mysql2/typings/mysql/lib/PoolConnection"
import { pool } from "./db/mysql/connect"
import { ordersRouter } from "./routes/orders/router"
import { usersRouter } from "./routes/users/router"

const app = express()
app.use(express.json())
app.use("/users", usersRouter)
app.use("/orders", ordersRouter)


// Start server
const localPort = process.env.PORT || 8080
const server = require("http").createServer(app)

console.log("Connecting to MySQL...")
pool.getConnection(function (err: Error, conn: PoolConnection) {
  // Do something with the connection
  if (err) {
    console.error("Could not connect to MySQL. Error: ", err)
  } else {
    conn.release()
    console.log("Connecting to Mongo...")
    connect()
      .then(() => {
        server.listen(localPort, async () => {
          console.log(
            `Server listening on port ${localPort}!`
          )
        })
      })
      .catch((err: Error) => {
        console.error("Could not connect to Mongo. Error: ", err)
      })
  }
})
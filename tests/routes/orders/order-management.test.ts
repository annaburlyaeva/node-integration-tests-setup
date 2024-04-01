import { describe, it } from "@jest/globals"
import { Connection } from "mysql2/promise"
import mysql from "mysql2/promise"
import { testApiClient } from "../../global-test-state"
import { injectData } from "../../db/mysql/manage-data"
import { createTables, dropTables } from "../../db/mysql/manage-tables"

describe("Test orders endpoints", () => {
  const tables = ["orders"]
  let conn: Connection

  beforeAll(async () => {
    conn = await mysql.createConnection({
      host: (globalThis as any).TEST_MYSQL_HOST,
      port: (globalThis as any).TEST_MYSQL_PORT,
      database: (globalThis as any).TEST_DATABASE_NAME,
      user: (globalThis as any).TEST_USERNAME,
      password: (globalThis as any).TEST_PASSWORD,
    })
  })

  beforeEach(async () => {
    await createTables(tables, conn)
    await injectData(tables, conn)
  })

  afterEach(async () => {
    await dropTables(tables, conn)
  })

  afterAll(async () => {
    await conn.end()
  })

  it("Should successfully create, get and delete order", async () => {
    let getOrdersRes = await testApiClient.get(`/orders/get`)
    expect(getOrdersRes.status).toEqual(200)
    expect(getOrdersRes.data.length).toEqual(7)
    const createReqBody = {
      new_order: {
        customer_id: 3,
        price: 50,
        quantity: 14,
      },
    }
    const res = await testApiClient.post(
      `/orders/create`,
      createReqBody
    )
    expect(res.status).toEqual(200)
    getOrdersRes = await testApiClient.get(`/orders/get`)
    expect(getOrdersRes.status).toEqual(200)
    expect(getOrdersRes.data.length).toEqual(8)
    const orderId = 1
    const deleteRes = await testApiClient.delete(
      `/orders/delete?order_id=${orderId}`
    )
    expect(deleteRes.status).toEqual(200)
    getOrdersRes = await testApiClient.get(`/orders/get`)
    expect(getOrdersRes.status).toEqual(200)
    expect(getOrdersRes.data.length).toEqual(7)
  })

})

import { Connection } from "mysql2/promise"
import { SEED_DATA } from "./seeds/seed-data"

export const SCHEMAS: any = {
  orders: [
    "order_id",
    "customer_id",
    "price",
    "quantity",
  ],
}

export async function insertValues(
  table: string,
  columns: string,
  values: string,
  conn: Connection
) {
  await conn.execute(`INSERT INTO ${table} (${columns}) VALUES ${values};`)
}

export async function injectData(tables: string[], conn: Connection) {
  let columns
  let rows
  for (let table of tables) {
    columns = SCHEMAS[table]
    rows = SEED_DATA[table]
    let tableValues: string[] = []
    for (let row of rows) {
      let rowValues: string[] = []
      for (let col of columns) {
        rowValues.push(
          typeof row[col] === "string"
            ? `"${row[col]}"`
            : row[col] === null
            ? "NULL"
            : row[col]
        )
      }
      tableValues.push(`(${rowValues.join(", ")})`)
    }

    await insertValues(table, columns.join(", "), tableValues.join(", "), conn)
  }
}

export async function clearTables(tables: string[], conn: Connection) {
  for (let table of tables) {
    await clearTable(conn, table)
  }
}

async function clearTable(conn: Connection, table: string) {
  await conn.execute(`TRUNCATE TABLE ${table};`)
}

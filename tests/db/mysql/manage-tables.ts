import mysql from "mysql2/promise"
interface CreateTableStatements {
  [key: string]: any
}

const CREATE_TABLE_STATEMENTS: CreateTableStatements = {
  orders:
    "CREATE TABLE IF NOT EXISTS orders \
    ( order_id int NOT NULL AUTO_INCREMENT, \
      customer_id int NOT NULL, \
      order_date varchar(255) DEFAULT NULL, \
      price int NOT NULL, \
      quantity int NOT NULL, \
      PRIMARY KEY (order_id) \
    ) \
    ENGINE=InnoDB AUTO_INCREMENT=92362 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci",
    }

export async function createTable(table: string, conn: mysql.Connection) {
  await conn.execute(CREATE_TABLE_STATEMENTS[table])
}

export async function createTables(tables: string[], conn: mysql.Connection) {
  for (let table of tables) {
    await createTable(table, conn)
  }
}

export async function dropTable(table: string, conn: mysql.Connection) {
  await conn.execute(`DROP TABLE ${table};`)
}

export async function dropTables(tables: string[], conn: mysql.Connection) {
  for (let table of tables) {
    await dropTable(table, conn)
  }
}

import { Network } from "testcontainers"
import { initMongoContainer } from "./db/mongodb/init-container"
import { initMySqlContainer } from "./db/mysql/init-container"
import { initApiContainer } from "./init-api-container"

const USERNAME = "test_user"
const PASSWORD = "test_password"
const DATABASE_NAME = "test_db"
const NODE_TEST_HOST = "test_node_api"
const NODE_TEST_PORT = 8082
const MYSQL_TEST_PORT = 3306
const MYSQL_TEST_HOST = "test_mysql"
const MONGO_TEST_CONTAINER_PORT = 27017
const MONGO_TEST_HOST_PORT = 27018
const MONGO_TEST_HOST = "test_mongo"

export default async function setupTestEnvironment(
  _globalConfig: any,
  _projectConfig: any
) {
  const network = await new Network().start()
  const mysqlContainer = await initMySqlContainer(
    network,
    USERNAME,
    PASSWORD,
    DATABASE_NAME,
    MYSQL_TEST_PORT
  )

  const mongoContainer = await initMongoContainer(
    MONGO_TEST_HOST,
    network,
    USERNAME,
    PASSWORD,
    MONGO_TEST_HOST_PORT,
    MONGO_TEST_CONTAINER_PORT
  )

  const apiContainer = await initApiContainer(
    NODE_TEST_HOST,
    network,
    USERNAME,
    PASSWORD,
    DATABASE_NAME,
    NODE_TEST_PORT,
    MYSQL_TEST_PORT,
    MYSQL_TEST_HOST,
    MONGO_TEST_CONTAINER_PORT,
    MONGO_TEST_HOST
  )

  const apiUrl = `http://${apiContainer.getHost()}:${apiContainer.getMappedPort(
    NODE_TEST_PORT
  )}`

  ;(globalThis as any).TEST_API_URL = apiUrl
  ;(globalThis as any).TEST_NETWORK = network
  ;(globalThis as any).TEST_API_CONTAINER = apiContainer
  ;(globalThis as any).TEST_MYSQL_CONTAINER = mysqlContainer
  ;(globalThis as any).TEST_MONGODB_CONTAINER = mongoContainer
  ;(globalThis as any).TEST_MONGO_HOST = mongoContainer.getHost()
  ;(globalThis as any).MONGO_TEST_HOST_PORT = MONGO_TEST_HOST_PORT
  ;(globalThis as any).MONGO_USERNAME = USERNAME
  ;(globalThis as any).MONGO_PASSWORD = PASSWORD
  ;(globalThis as any).MONGO_DATABASE = DATABASE_NAME
  ;(globalThis as any).TEST_MYSQL_HOST = mysqlContainer.getHost()
  ;(globalThis as any).TEST_MYSQL_PORT = mysqlContainer.getPort()
  ;(globalThis as any).TEST_DATABASE_NAME = mysqlContainer.getDatabase()
  ;(globalThis as any).TEST_USERNAME = mysqlContainer.getUsername()
  ;(globalThis as any).TEST_PASSWORD = mysqlContainer.getUserPassword()
}

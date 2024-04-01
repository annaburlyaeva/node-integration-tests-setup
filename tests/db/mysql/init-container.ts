import { MySqlContainer } from "@testcontainers/mysql"
import { StartedNetwork } from "testcontainers"

// Connect to MySQL
export async function initMySqlContainer(
  network: StartedNetwork,
  username: string,
  password: string,
  database: string,
  port: number
) {
  const mysqlContainer = await new MySqlContainer("mysql:8")
    .withName("test_mysql")
    .withRootPassword(password)
    .withUsername(username)
    .withUserPassword(password)
    .withDatabase(database)
    .withEnvironment({
      MYSQL_ROOT_PASSWORD: password,
      MYSQL_DB: database,
    })
    .withExposedPorts(port)
    .withNetwork(network)
    .start()

  console.log(
    "MySQL host: ",
    mysqlContainer.getHost(),
    mysqlContainer.getIpAddress(network.getName())
  )
  return mysqlContainer
}

import path from "path"
import { GenericContainer, StartedNetwork } from "testcontainers"

export async function initApiContainer(
  name: string,
  network: StartedNetwork,
  username: string,
  password: string,
  database: string,
  nodePort: number,
  mySqlPort: number,
  mySqlHost: string,
  mongoPort: number,
  mongoHost: string
) {
  const apiContainer = await new GenericContainer("node:18.17")
    .withName(name)
    .withNetwork(network)
    .withExposedPorts(nodePort)
    .withEnvironment({
      PORT: nodePort.toString(),
      MYSQL_HOST: mySqlHost,
      MYSQL_PORT: mySqlPort.toString(),
      MYSQL_DB: database,
      MYSQL_USER: username,
      MYSQL_PASSWORD: password,
      MONGO_HOST: mongoHost,
      MONGO_PORT: mongoPort.toString(),
      MONGO_DB: database,
      MONGO_USER: username,
      MONGO_PASSWORD: password,
      MONGO_CONN: `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/?directConnection=true`,
      ENV_STATE: "test",
    })
    .withBindMounts([
      {
        source: path.join(__dirname, "../node_modules"),
        target: "/node_modules",
        mode: "ro",
      },
      {
        source: path.join(__dirname, "../tsconfig.json"),
        target: "/tsconfig.json",
      },
      {
        source: path.join(__dirname, "../package.json"),
        target: "/package.json",
      },
      {
        source: path.join(__dirname, "../@types"),
        target: "/@types",
        mode: "ro",
      },
      {
        source: path.join(__dirname, "../src"),
        target: "/src",
        mode: "ro",
      },
    ])
    .withCommand([
      "sh",
      "-c",
      "npm run start",
    ])
    .start()
  console.log(
    "Node host: ",
    apiContainer.getHost(),
    apiContainer.getIpAddress(network.getName())
  )
  return apiContainer
}

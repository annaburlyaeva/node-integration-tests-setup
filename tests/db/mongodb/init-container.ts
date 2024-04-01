import { GenericContainer, StartedNetwork } from "testcontainers"

// Connect to Mongo
export async function initMongoContainer(
  name: string,
  network: StartedNetwork,
  username: string,
  password: string,
  hostPort: number,
  containerPort: number
) {
  const mongodbContainer = await new GenericContainer("mongo:6")
    .withName(name)
    .withEnvironment({
      MONGO_INITDB_ROOT_USERNAME: username,
      MONGO_INITDB_ROOT_PASSWORD: password,
    })
    .withExposedPorts({ container: containerPort, host: hostPort })
    .withNetwork(network)
    .start()

  console.log(
    "MongoDB host: ",
    mongodbContainer.getHost(),
    mongodbContainer.getIpAddress(network.getName())
  )
  return mongodbContainer
}
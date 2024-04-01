import { Collection, MongoClient } from "mongodb"
import { User } from "../../routes/users/user"

var url =
  process.env.ENV_STATE === "test"
    ? `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/?directConnection=true`
    : `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}/?retryWrites=true&w=majority`
var client = new MongoClient(url || "", { monitorCommands: true })

export var Users: Collection<User>

// Connect to Mongo
export async function connect() {
  await client.connect()
  const db = client.db(process.env.MONGO_DB)
  Users = db.collection("Users")
}



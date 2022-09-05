import mongoose from "mongoose";
import log from "../logger";

function connect() {
  const dbUri = process.env.DBUrl as string;

  return mongoose
    .connect(dbUri)
    .then(() => {
      log.info("Database connected");
    })
    .catch((error) => {
      log.error(error);
      log.error("db error", error);
      process.exit(1);
    });
}

mongoose.connection.on("disconnected", connect)
export default connect;
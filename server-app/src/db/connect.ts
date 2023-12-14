import mongoose from "mongoose";

function connect() {
  const dbUri = process.env.DBUrl as string;

  return mongoose
    .connect(dbUri)
    .then(() => {
      console.log("Database connected");
    })
    .catch((error) => {
      console.log(error);
      console.log("db error", error);
      process.exit(1);
    });
}

mongoose.connection.on("disconnected", connect)
export default connect;
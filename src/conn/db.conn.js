import { connect, connection } from "mongoose";

const PORT = process.env.PORT;
const DATABASE = process.env.DATABASE;

connect(DATABASE, {
  //useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  //useFindAndModify: false,
});

const db = connection;

db.on("error", () => {
  console.error("Error in DB connection");
});

db.on("open", () => {
  console.log(`DB is connected`);
});

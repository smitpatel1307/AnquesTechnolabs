import express from "express";
import { urlencoded, json } from "body-parser";
require("dotenv").config({ path: ".env" });
require("./src/conn/db.conn");

const PORT = process.env.PORT;
const server = express();
import { INTERNAL_LINK } from "./src/enum";
import { userRoute } from "./src/routes";
//import { userdetailRoute } from "./src/route";

server.use(urlencoded({ extended: true }));
server.use(json());
server.use(INTERNAL_LINK.USERS, userRoute);
//server.use(INTERNAL_LINK.USERSDETAIL, userdetailRoute);

server.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});

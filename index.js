require("dotenv").config();
const express = require("express");
const server = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const productRouter = require("./routes/product");

//morgan time logger
morgan.token("time", (req, res) => {
  const options = { timeZone: "Asia/Kolkata" };
  return new Date().toLocaleString("en-IN", options);
});

//mongoose connection
main().catch((err) => console.log(err));

async function main() {
  const conn = await mongoose.connect(process.env.MONGO_URL);
  console.log("database connected");

  // Accessing host and port
  const host = conn.connections[0].host;
  const port = conn.connections[0].port;
  console.log(`Host: ${host}, Port: ${port}`);

  // Accessing the database name
  const dbName = conn.connections[0].name;
  console.log(`Database Name: ${dbName}`);
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

//middlewares
server.use(cors()); //for linking two ports at the same time
server.use(express.json()); //for json parsing
server.use(
  morgan(
    ":time - :method :url :status :res[content-length] - :response-time ms"
  )
); //for server info in terminal
server.use("/products", productRouter.router); //products router
server.use(express.static(path.resolve(__dirname, process.env.PUBLIC_DIR)));
server.use("*", (req, res) => {
  res.sendFile(path.resolve(__dirname + "/build/index.html"));
});
server.listen(process.env.PORT, () => {
  console.log("server started");
  // console.log(mongoose.Types);
});

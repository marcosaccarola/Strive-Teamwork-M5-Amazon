import express from "express";
import productsRouter from "./products/index.js";
import listEndpoints from "express-list-endpoints"
import cors from "cors"
import { publicFolderPath } from "../utils/utils.js";

const server = express();
const PORT = 3001;

server.use(cors())
server.use(express.json())

server.use(express.static(publicFolderPath))
server.use("/products", productsRouter)

console.table(listEndpoints(server))

server.listen(PORT, () => {
  console.log(`SERVER OK - PORT: ${PORT}`);
});
server.on("error", (error) => console.log(`SERVER CRASH - ERROR: ${error}`));

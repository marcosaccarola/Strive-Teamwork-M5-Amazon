

import {badRequestErrorHandler,notFoundErrorHandler, forbiddenErrorHandler, genericServerErrorHandler } from './errorHandlers.js'


import express from "express";
import productsRouter from "./products/index.js";
import listEndpoints from "express-list-endpoints"
import cors from "cors"
import reviewsRouter from './reviews/index.js'


const server=express()
const PORT=3001
server.use(cors())
server.use(express.json())

server.use('/reviews',reviewsRouter)
server.use('/products/:id/reviews',reviewsRouter)
server.use("/products", productsRouter)

console.table(listEndpoints(server))


server.use(badRequestErrorHandler)
server.use(notFoundErrorHandler)
server.use(forbiddenErrorHandler)
server.use(genericServerErrorHandler)


server.listen(PORT, () => {
  console.log(`SERVER OK - PORT: ${PORT}`);
});
server.on("error", (error) => console.log(`SERVER CRASH - ERROR: ${error}`));


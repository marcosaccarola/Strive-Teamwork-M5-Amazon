import express from 'express'
import {badRequestErrorHandler,notFoundErrorHandler, forbiddenErrorHandler, genericServerErrorHandler } from './errorHandlers.js'

const server=express()
const PORT=3001

server.use(badRequestErrorHandler)
server.use(notFoundErrorHandler)
server.use(forbiddenErrorHandler)
server.use(genericServerErrorHandler)

server.listen(PORT,()=>{console.log(`SERVER OK - PORT: ${PORT}`)})
server.on('error',(error)=>console.log(`SERVER CRASH - ERROR: ${error}`))
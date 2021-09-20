import express from 'express'
import cors from 'cors'

import reviewsRouter from './reviews/index.js'

const server=express()
server.use(cors())
server.use(express.json())
server.use('/reviews',reviewsRouter)
server.use('/products/:id/reviews',reviewsRouter)
const PORT=3001

server.listen(PORT,()=>{console.log(`SERVER OK - PORT: ${PORT}`)})
server.on('error',(error)=>console.log(`SERVER CRASH - ERROR: ${error}`))
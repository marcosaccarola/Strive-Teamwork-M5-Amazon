import express from 'express'

const server=express()
const PORT=3001

server.listen(PORT,()=>{console.log(`SERVER OK - PORT: ${PORT}`)})
server.on('error',(error)=>console.log(`SERVER CRASH - ERROR: ${error}`))
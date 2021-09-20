import express from 'express'
import {fileURLToPath} from 'url'
import path,{dirname} from 'path'
import fs from 'fs'

const _FILENAME=fileURLToPath(import.meta.url)
const _DIRNAME=dirname(_FILENAME)
const reviewsJSONFILEPath=path.join(_DIRNAME,'reviews.json')

const router=express.Router()

// GET ALL REVIEWS
router.get('/',async(req,res,next)=>{
    try {
        const buffer=fs.readFileSync(reviewsJSONFILEPath)
        const string=buffer.toString()
        const array=JSON.parse(string)
        res.send(array)
    } catch (error) {
        res.status(500).send({message:error.message})
    }
})

export default router
import express from 'express'
import {fileURLToPath} from 'url'
import path,{dirname} from 'path'
import fs from 'fs'
import uniqid from 'uniqid'
import {checkReviewSchema,checkValidationResult} from './validation.js'

const _FILENAME=fileURLToPath(import.meta.url)
const _DIRNAME=dirname(_FILENAME)
const reviewsJSONFILEPath=path.join(_DIRNAME,'reviews.json')
//const productsJSONFILEPath=path.join(_DIRNAME,'../products/products.json')



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
// POST A REVIEW by product ID
router.post('/:id',checkReviewSchema,checkValidationResult,async(req,res,next)=>{
    try {        
        const buffer=fs.readFileSync(reviewsJSONFILEPath)
        const string=buffer.toString()
        const array=JSON.parse(string)
        //const{comment,rate}=req.body BECAUSE I'M USING VALIDATION SCHEMA
        const review={
            _id:uniqid(),
            //comment,rate, BECAUSE I'M USING VALIDATION SCHEMA
            ...req.body,
            productId:req.params.id,
            createdAt:new Date()
        }
        array.push(review)
        fs.writeFileSync(reviewsJSONFILEPath,JSON.stringify(array))
        res.send(review)
    } catch (error) {
        res.status(500).send({message:error.message})
    }   
})
// UPDATE A REVIEW by review ID
router.put('/:id',async(req,res,next)=>{
    try {
        const buffer=fs.readFileSync(reviewsJSONFILEPath)
        const string=buffer.toString()
        const array=JSON.parse(string)
        const oldReviewIndex=array.findIndex(r=>r._id===req.params.id)
        if(oldReviewIndex==-1){message:`REVIEW WITH ID ${req.params.id} DOES NOT EXIST`}
        const oldReview=array[oldReviewIndex]
        const updatedReview={...oldReview,...req.body,upDatedAt:new Date(),_id:req.params.id}
        array[oldReviewIndex]=updatedReview
        fs.writeFileSync(reviewsJSONFILEPath,JSON.stringify(array))
        res.send(updatedReview)
    } catch (error) {
        res.status(500).send({message:error.message})
    }
})
// DELETE A REVIEW by id
router.delete('/:id',async(req,res,next)=>{
    try {
        const buffer=fs.readFileSync(reviewsJSONFILEPath)
        const string=buffer.toString()
        const array=JSON.parse(string)
        const reviewToDelete=array.find(r=>r._id===req.params.id)
        if(!reviewToDelete){message:`A REVIEW WITH ID ${req.params.id} DOES NOT EXIST`}
        const newArray=array.filter(r=>r._id!==req.params.id)
        fs.writeFileSync(reviewsJSONFILEPath,JSON.stringify(newArray))
        res.send(newArray)
    } catch (error) {
        res.status(500).send({message:error.message})
    }
})
// GET A SINGLE REVIEW by ID
router.get('/:id',async(req,res,next)=>{
    try {
        const buffer=fs.readFileSync(reviewsJSONFILEPath)
        const string=buffer.toString()
        const array=JSON.parse(string)
        const reqReview=array.find(r=>r._id===req.params.id)
        if(!reqReview){message:`A REVIEW WITH ID ${req.params.id} DOES NOT EXIST`}
        res.send(reqReview)
    } catch (error) {
        res.status(500).send({message:error.message})
    }
})
// EXTRA METHOD TO GET ALL REVIEWS OF A SPECIFIC PRODUCT
router.get('/products/:id/reviews',async(req,res,next)=>{
    try {
        const buffer=fs.readFileSync(reviewsJSONFILEPath)
        const string=buffer.toString()
        const array=JSON.parse(string)
        const reviews=array.filter(r=>r.productId===req.params.id)
        console.log('reviews:',reviews)
        res.send(reviews)
    } catch (error) {
        res.status(500).send({message:error.message})
    }
})

export default router
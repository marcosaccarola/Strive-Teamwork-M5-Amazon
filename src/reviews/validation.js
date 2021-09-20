import { checkSchema,validationResult } from "express-validator";

const reviewSchema={
    comment:{
        isString:{
            errorMessage:'COMMENT FIELD IS REQUIRED FOR REVIEWS'
        }
    },
    rate:{
        isNumeric:{
            errorMessage:'RATE IS REQUIRED FOR REVIEWS'
        }
    }
}
export const checkReviewSchema=checkSchema(reviewSchema)
export const checkValidationResult=(req,res,next)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        const error=new Error('BLOG POST VALIDATION FAILED')
        error.status=400
        error.errors=errors.array()
        next(error)
    }
    next()
}
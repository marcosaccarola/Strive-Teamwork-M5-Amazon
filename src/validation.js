import { body } from 'express-validator'

export const postValidationMiddleware = [
    body("name").exists().withMessage("name is a mandatory field!"),
    body("description").exists().withMessage("description is a mandatory field!"),
    body("brand").exists().withMessage("brand  is a mandatory field!"),
    body("price").exists().withMessage("price  is a mandatory field!"),
    body("category").exists().withMessage("category  is a mandatory field!"),
    body("comment").exists().withMessage("comment  is a mandatory field!"),
    body("rate").exists().withMessage("rate is a mandatory field!"),
    body("productId").exists().withMessage("productId  is a mandatory field!")
]
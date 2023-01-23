import { getOneProduct, getProduct, createProduct, deleteProduct } from './handlers/product';
import { Router } from 'express'
import { body, oneOf, validationResult } from 'express-validator'
import { version } from 'os'
import { handleInputError } from './modules/middlewares'
const router = Router()

//Product
router.get('/product', getProduct)
router.get('/product/:id', getOneProduct)
router.post('/product', createProduct, body('name').isString(),
    handleInputError,)
router.put(
    '/product/:id',
    body('name').isString(),
    handleInputError,
    (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(400)
            res.json({ error: errors.array() })
        }
    },
)
router.delete('/product/:id', deleteProduct)

//Update
router.get('/update', () => { })
router.get('/update/:id', () => { })
router.put(
    '/update/:id',
    body('title').optional(),
    body('body').optional(),
    body("status").isIn(['IN_PROGRESS', 'SHIPPED']),
    body('version').optional,
    () => { },
)
router.post(
    '/update',
    body('title').exists().isString(),
    body('body').exists().isString(),
    () => { },
)
router.delete('/update/:id', () => { })

//UpdatePoint
router.get('/updatepoint', () => { })
router.get('/updatepoint/:id', () => { })
router.put(
    '/updatepoint/:id',
    body('name').optional().isString(),
    body('description').optional().isString(),
    () => { },
)
router.post('/updatepoint',
    body('name').isString(),
    body('description').isString(),
    body("updateId").exists().isString(),
    () => { })
router.delete('/updatepoint/:id', () => { })

export default router

import express, { Router } from 'express'
import { FileManager } from '../classes/FileManager.js'
import { postCreateProductController } from '../controllers/product.post.controller.js'
import { getAllProductsController, getProductByIdController } from '../controllers/product.get.controller.js'
import { deleteProduct } from '../controllers/product.delete.controller.js'
import { putProduct } from '../controllers/product.put.controller.js'
import { onlyAuthenticated } from '../middlewares/autenticacionWeb.js'

export const apiRouterProducts = Router()

apiRouterProducts.use(express.json())
apiRouterProducts.use(express.urlencoded({ extended: true }))

export const productManagerOld = new FileManager('./database/products.json')

apiRouterProducts.get('/products', onlyAuthenticated, getAllProductsController)
apiRouterProducts.get('/products/:pid', onlyAuthenticated, getProductByIdController)

apiRouterProducts.post('/products', postCreateProductController)

// TODO: update && delete
apiRouterProducts.put('/products/:pid', putProduct)
apiRouterProducts.delete('/products/:pid', deleteProduct)

import express, { Router } from 'express'
import { getCartByIdController, getAddProductToCartController } from '../controllers/cart.get.controller.js'
import { removeProductFromCartController, removeProductsFromCartController } from '../controllers/cart.delete.controller.js'
import { updateProductFromCartController, updateProductsFromCartController } from '../controllers/cart.put.controller.js'
import { onlyAuthenticated } from '../middlewares/autenticacionWeb.js'
import { postCreateCartController } from '../controllers/cart.post.controller.js'

export const apiRouterCarts = Router()

apiRouterCarts.use(express.json())

apiRouterCarts.post("/carts", onlyAuthenticated, postCreateCartController)

apiRouterCarts.get('/carts/:cid', onlyAuthenticated, getCartByIdController)

apiRouterCarts.get('/carts/:cid/product/:pid', onlyAuthenticated, getAddProductToCartController)

apiRouterCarts.delete('/carts/:cid', onlyAuthenticated, removeProductsFromCartController)
apiRouterCarts.delete('/carts/:cid/product/:pid', removeProductFromCartController)

apiRouterCarts.put("/carts/:cid", onlyAuthenticated, updateProductsFromCartController);
apiRouterCarts.put("/:cid/product/:pid", onlyAuthenticated, updateProductFromCartController);

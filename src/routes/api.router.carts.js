import express, { Router } from 'express'
import { FileManager } from '../classes/FileManager.js'
import { randomUUID } from 'crypto'
import { Cart } from '../classes/Cart.js'
import { getCartByIdController, getAddProductToCartController } from '../controllers/cart.get.controller.js'
import { removeProductFromCartController, removeProductsFromCartController } from '../controllers/cart.delete.controller.js'
import { cartManager, cartsModel } from '../managers/CartManager.js'
import { updateProductsFromCartController } from '../controllers/cart.put.controller.js'
import util from 'node:util'

export const apiRouterCarts = Router()

apiRouterCarts.use(express.json())

const cartManagerOld = new FileManager('./database/carts.json')

apiRouterCarts.post("/carts", async (req, res, next) => {
  try {
    const newcart = new Cart();
    console.log(newcart)
    const result = await cartManager.addCart(newcart);
    res.json(result);
  } catch (error) {
    next(error);
  }
})

// apiRouterCarts.get('/carts/:cid', getCartByIdController)
apiRouterCarts.get('/carts/:cid', async (req, res, next) => {
  // try {
  //     const cart = await cartsModel.findById(req.params.cid).populate('products.product');
  //     res.json(cart);
  //   } catch (error) {
  //     next(error);
  //   }
  try {
    const cart = await cartsModel.findById(req.params.cid).populate('products.product').lean()
    // const cart = await cartsModel.findById(req.params.cid).populate({
    //   path: 'products.id',
    //   model: 'products',
    //   select: 'title description price'
    // }).lean()
    console.log('cart -> ', cart)

      const populateString = util.inspect(cart, false, 10)
      console.log('populateString -> ', populateString)
      console.log('populateString typeof -> ', typeof populateString)

    // //   const populateCart = JSON.parse(populateString)
    //   const populateCart = eval(`(${populateString})`)
    //   console.log('populateCart -> ', populateCart)
    //   console.log('populateCart typeof -> ', typeof populateCart)

    res.render('cart', {
      pageTitle: 'Cart',
      cart: cart
    });
  } catch (err) {
    next(err);
  }
});


apiRouterCarts.get('/carts/:cid/product/:pid', getAddProductToCartController)

apiRouterCarts.delete('/carts/:cid', removeProductsFromCartController)
apiRouterCarts.delete('/carts/:cid/product/:pid', removeProductFromCartController)

apiRouterCarts.put("/carts/:cid", updateProductsFromCartController);
apiRouterCarts.put("/:cid/product/:pid",);

// old, delete? ---------------------------------------------------------------------------- xxxxxxxxx
// apiRouterCarts.post('/carts', async (req, res, next) => {
//     try {
//         const cart = new Cart({
//             id: randomUUID()
//         })
//         const agregado = await cartManagerOld.guardarCosa(cart)
//         res.json(agregado)
//     } catch (error) {
//         next(error)
//     }
// })

// apiRouterCarts.post('/carts/:cid/product/:pid', async (req, res, next) => {
//     const cart = await cartManagerOld.buscarCosaSegunId(req.params.cid)
//     let index = cart.products.findIndex(e => e.product == req.params.pid)
//     if (index === -1 || index == undefined) {
//         cart.products.push({
//             product: req.params.pid,
//             quantity: 1
//         })
//         const nuevoCart = await cartManagerOld.reemplazarCosa(req.params.cid, cart)
//         res.json(nuevoCart)
//     } else {
//         cart.products[index].quantity++
//         const nuevoCart = await cartManagerOld.reemplazarCosa(req.params.cid, cart)
//         res.json(nuevoCart)
//     }
// })

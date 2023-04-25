import { cartManager } from '../managers/CartManager.js';
import { productManager } from '../managers/ProductManager.js';

export async function getCartByIdController(req, res, next) {
    try {
        const cart = await cartManager.getCartById(req.params.cid);
        res.render('cart', {
            pageTitle: 'Cart',
            cart: cart
        });
    } catch (error) {
        next(error);
    }
}

export async function getAddProductToCartController(req, res, next) {
    {
        try {
          await productManager.getProductById(req.params.pid);
        } catch (error) {
          return next(error);
        }
        try {
          const product = await cartManager.addProductInCart(req.params.cid, req.params.pid);
          res.json(product);
        } catch (error) {
          next(error);
        }
      }
    // try {
    //     const cart = await cartManager.addProductInCart(req.params.cid, req.params.pid);
    //     console.log(cart);
    //     res.json(cart);
    // } catch (error) {
    //     next(error);
    // }
}

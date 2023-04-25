import { cartManager } from '../managers/CartManager.js';


export async function removeProductsFromCartController(req, res, next) {
    try {
        const result = await cartManager.removeProductsFromCart(req.params.cid)
        res.json(result)
      } catch (error) {
        console.log(error.message)
      }
}

export async function removeProductFromCartController(req, res, next) {
    try {
        const result = await cartManager.removeProductFromCart(req.params.cid, req.params.pid)
        res.json(result)
    } catch (error) {
        next(error);
    }
}

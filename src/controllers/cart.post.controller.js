import { Cart } from '../classes/Cart.js';
import { cartManager } from '../managers/CartManager.js';

export async function postCreateCartController(req, res, next) {
  try {
    const newcart = new Cart();
    console.log(newcart)
    const result = await cartManager.addCart(newcart);
    res.json(result);
  } catch (error) {
    next(error);
  }
}
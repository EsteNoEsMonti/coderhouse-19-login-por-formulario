import { cartManager } from '../managers/CartManager.js';
import { productManager } from '../managers/ProductManager.js';

export async function updateProductFromCartController(req, res, next) {
    try {
        const prod = await productManager.getProductById(req.params.pid);
        try {
            // @ts-ignore
            if (prod?.stock < req.body.quantity) {
                throw new Error("Not Enough Stock");
            }
        } catch (error) {
            return next(error);
        }
    } catch (error) {
        return next(error);
    }
    try {
        const productupd = await cartManager.updProductinCart(req.params.cid, req.params.pid, req.body);
        res.json(productupd);
    } catch (error) {
        next(error);
    }
}

export async function updateProductsFromCartController(req, res, next) {
    try {
        const result = await cartManager.updateProductsCart(req.params.cid, req.body);
        res.json(result);
    } catch (error) {
        next(error);
    }
}

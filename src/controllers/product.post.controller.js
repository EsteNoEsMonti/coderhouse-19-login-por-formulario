import { Product } from '../classes/Product.js';
import { productManager, productsModel } from '../managers/ProductManager.js';
import { getAllProductsController } from './product.get.controller.js';

export async function postCreateProductController(req, res, next) {
    try {
        const product = await new Product(req.body);

        const result = await productManager.save(product.getData())
        // console.log('result -> ', result);

        req['io'].sockets.emit('products', await getAllProductsController())

        res.send(result);
    } catch (error) {
        next(error);
    }
}

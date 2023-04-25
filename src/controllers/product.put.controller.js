import { Product } from '../classes/Product.js';
import { productManagerOld } from '../routes/api.router.products.js';

// TODO

export async function putProduct(req, res, next) {
    let nuevoProducto;
    try {
        nuevoProducto = new Product({
            id: req.params.pid,
            ...req.body
        });
    } catch (error) {
        next(error);
        return;
    }

    try {
        const productoReemplazado = await productManagerOld.reemplazarCosa(req.params.pid, nuevoProducto);
        res.json(productoReemplazado);
    } catch (error) {
        next(error);
    }
}

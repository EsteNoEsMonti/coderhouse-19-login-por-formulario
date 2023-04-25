import { productManagerOld } from "../routes/api.router.products.js";

export async function deleteProduct(req, res, next) {
    try {
        const borrado = await productManagerOld.borrarCosaSegunId(req.params.pid);
        res.json(borrado);
    } catch (error) {
        next(error);
    }
}

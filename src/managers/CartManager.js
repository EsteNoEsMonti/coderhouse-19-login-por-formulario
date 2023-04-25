import mongoose from "mongoose"
import { productManager } from "./ProductManager.js"
import { CartProduct } from "../classes/Cart.js"

// const schemaCart = new mongoose.Schema({
//   products: { type: Array, require: false }
// })

const schemaCart = new mongoose.Schema({
  products: {
    type: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
        },
        quantity: { type: Number },
      },
    ],
    default: [],
  }
})

schemaCart.pre(/^find/, function (next) {
  this.populate("products.product");
  next();
});

export const cartsModel = mongoose.model('cart', schemaCart);

class CartManager {
  #cartsDb
  constructor() {
    this.#cartsDb = mongoose.model('cart', schemaCart)
  }

  async save(dataCart) {
    let cartSaved = await this.#cartsDb.create(dataCart)
    cartSaved = JSON.parse(JSON.stringify(cartSaved))
    return cartSaved
  }

  async addCart(cart) {
    const cartSave = await this.#cartsDb.create(cart);
    return cartSave;
  }

  async getCartById(id) {
    const cart = await this.#cartsDb.findById(id).lean()
    return cart
  }

  async getProductsInCartById(id) {
    const cart = await this.#cartsDb.findById(id).lean();
    if (!cart) {
      throw new Error("Not Found");
    }
    return cart.products;
  }

  async updateCart(cart) {
    const newCart = await this.#cartsDb.updateOne((cart))
    return newCart
  }

  async addProductInCart(cid, pid) {
    const products = await this.getProductsInCartById(cid);
    const serchprod = products.find(
      (p) => JSON.parse(JSON.stringify(p.product?._id)) === pid
    );
    if (!serchprod) {
      products.push({ product: pid, quantity: 1 });
    } else {
      // @ts-ignore
      serchprod.quantity++;
      console.log(serchprod);
    }
    await this.#cartsDb.findByIdAndUpdate(cid, { products: products });
    return serchprod;
  }

  // async addProductInCart(cartID, productID) {
  //   const cart = await this.#cartsDb.findById(cartID).lean()
  //   const product = await productManager.getProductById(productID)

  //   // @ts-ignore
  //   let productIndex = cart.products.findIndex(e => JSON.stringify(e.id) === JSON.stringify(product._id))

  //   if (productIndex === -1 || productIndex == undefined) {
  //     // @ts-ignore
  //     const newCartProduct = new CartProduct({ id: product._id })
  //     // @ts-ignore
  //     cart.products.push(newCartProduct)
  //     await this.updateCart(cart)
  //     return cart
  //   }
  //   // @ts-ignore
  //   ++cart.products[productIndex].quantity

  //   await this.updateCart(cart)
  //   return cart
  // }

  async removeProductsFromCart(cartID) {
    const updatedCart = await this.#cartsDb.findByIdAndUpdate(cartID, { products: [] }, { new: true });
    return updatedCart;
  }

  async removeProductFromCart(cartID, productID) {
    try {
      console.log(cartID, productID)
      const cart = await this.#cartsDb.findById(cartID).lean()
      const product = await productManager.getProductById(productID)

      let productIndex = cart.products.findIndex(e => JSON.stringify(e.id) === JSON.stringify(product._id))

      if (productIndex >= 0) {
        cart.products.splice(productIndex, 1);

        const updatedCart = await this.#cartsDb.findOneAndUpdate({ _id: cartID }, { products: cart.products }, { new: true });

        return updatedCart;
      } else {
        return null;
      }
    } catch (error) {
      console.error(error)
    }
  }

  async updateProductsCart(cartID, updcart) {
    const cart = await this.#cartsDb.findById(cartID).lean();
    if (!cart) {
      throw new Error("Not Found");
    }
    await this.#cartsDb.findByIdAndUpdate(cartID, { products: updcart });
  }

  async updProductinCart(cartID, productID, updquantity) {
    const products = await this.getProductsInCartById(cartID);
    const serchprod = products.find(
      (p) => JSON.parse(JSON.stringify(p.product?._id)) === productID
    );
    if (!serchprod) {
      throw new Error("Not Found");
    }
    if (isNaN(updquantity.quantity) || updquantity.quantity < 0) {
      throw new Error("Invalid Quantity");
    }
    serchprod.quantity = updquantity.quantity;
    await this.#cartsDb.findByIdAndUpdate(cartID, { products: products });
  }
}

export const cartManager = new CartManager()


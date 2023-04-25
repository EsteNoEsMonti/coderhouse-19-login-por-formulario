import mongoose from "mongoose"
import mongoosePaginate from 'mongoose-paginate-v2'

const productsCollection = 'products'

const schemaProducts = new mongoose.Schema({
  id: { type: String, require: true },
  title: { type: String, require: true },
  description: { type: String, require: true },
  code: { type: String, require: true },
  price: { type: Number, require: true },
  stock: { type: Number, require: true },
  category: { type: String, require: true },
  status: { type: String, require: false },
  thumbnails: { type: String, require: false }
})

schemaProducts.plugin(mongoosePaginate)
export const productsModel = mongoose.model(productsCollection, schemaProducts)

class ProductManagerManager {
  #productsDb
  constructor() {
    this.#productsDb = mongoose.model(productsCollection, schemaProducts)
  }

  async save(dataProduct) {
    let productSaved = await this.#productsDb.create(dataProduct)
    productSaved = JSON.parse(JSON.stringify(productSaved))
    return productSaved
  }

  async getAllProducts() {
    const products = await this.#productsDb.find().lean()
    return products
  }

  async getProductById(id) {
    const product = await this.#productsDb.findById(id).lean()
    return product
  }

  // TODO: update
//   async updateProduct(id, newProduct) {
//     const products = await this.#productsDb.find().lean()
//     const indexFinded = products.findIndex(c => c.id === id)
//     if (indexFinded === -1) {
//         throw new Error('id no encontrado')
//     }
//     // products[indexFinded] = newProduct
//     let updatedProduct= await this.#productsDb.updateOne(newProduct)
//     console.log(updatedProduct);
//     return updatedProduct
// }
  // TODO: delete
}

export const productManager = new ProductManagerManager()


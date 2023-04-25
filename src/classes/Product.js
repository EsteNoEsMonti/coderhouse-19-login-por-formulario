export class Product {
  #id
  #title
  #description
  #code
  #price
  #status
  #stock
  #category
  #thumbnails
  constructor({ id, title, description, code, price, status = true, stock, category, thumbnails }) {
    // if (!id) throw new Error('Contructor Product error: An argument is missing')
    if (!title) throw new Error('Contructor Product error: An argument is missing')
    if (!description) throw new Error('Contructor Product error: An argument is missing')
    if (!code) throw new Error('Contructor Product error: An argument is missing')
    if (!price) throw new Error('Contructor Product error: An argument is missing')
    if (!stock) throw new Error('Contructor Product error: An argument is missing')
    if (!category) throw new Error('Contructor Product error: An argument is missing')

    this.#id = id
    this.#title = title
    this.#description = description
    this.#code = code
    this.#price = price
    this.#status = status
    this.#stock = stock
    this.#category = category
    this.#thumbnails = thumbnails
  }

  get id() { return this.#id }
  get title() { return this.#title }
  get description() { return this.#description }
  get code() { return this.#code }
  get price() { return this.#price }
  get status() { return this.#status }
  get stock() { return this.#stock }
  get category() { return this.#category }
  get thumbnails() { return this.#thumbnails }

  getData() {
    return {
      id: this.#id,
      title: this.#title,
      description: this.#description,
      code: this.#code,
      price: this.#price,
      status: this.#status,
      stock: this.#stock,
      category: this.#category,
      thumbnails: this.#thumbnails
    }
  }
}
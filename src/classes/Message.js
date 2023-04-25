export class Product {
  #id
  #user
  #message
  #date
  constructor({ id, date, user, message }) {
    this.#id = id
    this.#user = user
    this.#message = message
    this.#date = date
  }

  get id() { return this.#id }
  get user() { return this.#user }
  get message() { return this.#message }
  get date() { return this.#date }


  getData() {
    return {
      id: this.#id,
      user: this.#user,
      message: this.#message,
      date: this.#date
    }
  }

}
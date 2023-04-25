import mongoose from "mongoose"

const schemaMessage = new mongoose.Schema({
  user: { type: String, require: true },
  message: { type: String, require: true },
  date: { type: Date, require: true }
})

class MessageManager {
  #messagesDb
  constructor() {
    this.#messagesDb = mongoose.model('message', schemaMessage)
  }

  async save(dataMessage) {
    let messageSaved = await this.#messagesDb.create(dataMessage)
    messageSaved = JSON.parse(JSON.stringify(messageSaved))
    return messageSaved
  }

  async getAllMessages() {
    const messages = await this.#messagesDb.find().lean()
    return messages
  }

  async getMessageById(id) {
    const message = await this.#messagesDb.findById(id).lean()
    return message
  }

  // TODO: update
  // TODO: delete
}

export const messageManager = new MessageManager()


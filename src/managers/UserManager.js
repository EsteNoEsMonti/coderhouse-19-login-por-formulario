import mongoose from 'mongoose'

const usersCollection = 'users'

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number, required: true },
  role: { type: String, required: true }

}, { versionKey: false })

export const userModel = mongoose.model(usersCollection, userSchema)

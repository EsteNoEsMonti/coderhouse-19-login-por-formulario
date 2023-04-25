import express, { Router } from 'express'
import { messageManager } from '../managers/MessageManager.js'

export const apiRouterMessages = Router()

apiRouterMessages.use(express.json())

apiRouterMessages.get('/chat', async (req, res) => {
  const messages = await messageManager.getAllMessages()
  res.render('chat', {
      pageTitle: 'Chat'
  })
})
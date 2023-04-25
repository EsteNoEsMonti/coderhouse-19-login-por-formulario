import express, { Router } from 'express'
import { messageManager } from '../managers/MessageManager.js'
import { onlyAuthenticated } from '../middlewares/autenticacionWeb.js'
import { chatController } from '../controllers/chat.controller.js'

export const apiRouterMessages = Router()

apiRouterMessages.use(express.json())

apiRouterMessages.get('/chat', onlyAuthenticated, chatController)
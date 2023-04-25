import { messageManager } from '../managers/MessageManager.js'

export async function chatController(req, res, next) {
    try {
        const messages = await messageManager.getAllMessages()
        res.render('chat', {
            pageTitle: 'Chat'
        })
    } catch (error) {
        next(error);
    }
}
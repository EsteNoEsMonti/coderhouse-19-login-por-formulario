import express from 'express'
import { apiRouterProducts } from '../routes/api.router.products.js'
import { apiRouterCarts } from '../routes/api.router.carts.js'
import { PORT } from '../config/server.config.js';
import { engine } from "express-handlebars";
import { connectDb } from '../database/mongoose.js';
import { Server } from 'socket.io'
import { apiRouterMessages } from '../routes/chat.router.js';
import { messageManager } from '../managers/MessageManager.js';
import { apiRouterSession } from '../routes/session.router.js';
import session from '../middlewares/session.js'

await connectDb()
const app = express()

const server = app.listen(PORT, () => {
  console.log(`🌙 Server listening on PORT:${PORT} 🦻🙉`)
})

const io = new Server(server)
io.on('connection', async socket => {
  console.log('🌙 cliente nuevo conectado')

  socket.on('newMessage', async message => {
    await messageManager.save(message)
    const messages = await messageManager.getAllMessages()
    // @ts-ignore
    const messagesForFront = messages.map(m => ({ ...m, fecha: new Date(m.timestamp).toLocaleTimeString() }))
    io.sockets.emit('updateMessages', messagesForFront)
  })

  socket.on('newUsuario', async username => {
    socket.broadcast.emit('newUsuario', username)
  })

  const messages = await messageManager.getAllMessages()
  // @ts-ignore
  const messagesForFront = messages.map(m => ({ ...m, fecha: new Date(m.timestamp).toLocaleTimeString() }))
  io.sockets.emit('updateMessages', messagesForFront)
})

// a cada cosa que me llegue le meto el 'io' en la petition
app.use((req, res, next) => {
  req['io'] = io
  next()
})

app.engine('handlebars', engine())
app.set('views', './views')
app.set('view engine', 'handlebars')

app.use(express.static('./public'))
app.use(express.json())

app.use(session)

app.use(apiRouterProducts)
app.use(apiRouterCarts)
app.use(apiRouterMessages)
app.use(apiRouterSession)

app.use((error, req, res, next) => {
  switch (error.message) {
    case 'id no encontrado':
      res.status(404)
      break
    case 'Contructor Product error: An argument is missing':
      res.status(400)
      break
    case 'Contructor Cart error: An argument is missing':
      res.status(400)
      break
    default:
      res.status(500)
  }
  res.json({ message: error.message })
})


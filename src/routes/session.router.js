import express, { Router } from 'express'
import { userModel } from '../managers/UserManager.js';
import { deleteSessionController } from '../controllers/session.delete.controler.js';

export const apiRouterSession = Router()

apiRouterSession.use(express.json())

apiRouterSession.get('/', function (req, res) {
  res.redirect('/login');
})

apiRouterSession.get('/login', function (req, res) {
  res.render('login', {
    pageTitle: 'Login'
  })
})

apiRouterSession.post('/login', async function (req, res) {
  try {
    res.redirect('/register')
  } catch (error) {
    console.log(error)
  }
})

apiRouterSession.get('/register', function (req, res) {
  res.render('register', {
    pageTitle: 'Register'
  })
})

apiRouterSession.post('/users', async function (req, res, next) {

  const userWithRole = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    age: req.body.age,
    password: req.body.password,
    role: (req.body.email === 'adminCoder@coder.com' && req.body.password === 'adminCod3r123') ? 'admin' : 'user',
  }
  const userCreated = await userModel.create(userWithRole)

  // @ts-ignore
  req.session.user = {
    name: userCreated.firstName + ' ' + userCreated.lastName,
    email: userCreated.email,
    age: userCreated.age,
    role: userCreated.role
  }

  res.status(201).json(userCreated)

})


apiRouterSession.post('/sessions', async function (req, res, next) {

  if (req.body.email == 'adminCoder@coder.com' && req.body.password == 'adminCod3r123') {
    // @ts-ignore
    req.session.user = {
      name: 'Coder Admin 😎',
      email: 'adminCoder@coder.com',
      age: '🤐',
      role: 'admin'
    }
    // @ts-ignore
    res.status(201).json(req.session.user)
  } else {
    const userFinded = await userModel.findOne({ email: req.body.email }).lean()
    if (!userFinded) return res.sendStatus(401)

    if (userFinded.password !== req.body.password) {
      return res.sendStatus(401)
    }

    // @ts-ignore
    req.session.user = {
      name: userFinded.firstName + ' ' + userFinded.lastName,
      email: userFinded.email,
      age: userFinded.age,
      role: userFinded.role
    }

    // @ts-ignore
    res.status(201).json(req.session.user)
  }
})

apiRouterSession.delete('/sessions', deleteSessionController)




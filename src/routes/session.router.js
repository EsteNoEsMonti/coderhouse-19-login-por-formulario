import express, { Router } from 'express'
import { userModel } from '../managers/UserManager.js';

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
    const result = await req.body
    console.log('redirect >>>>> (desde public JS)')
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
  }

  res.status(201).json(userCreated)
  
})


apiRouterSession.post('/sessions', async function (req, res, next) {
  console.log('req.body -> ', req.body)
  console.log('req.session -> ', req.session)

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
  }

  // @ts-ignore
  res.status(201).json(req.session.user)
})

apiRouterSession.delete('/sessions', async function (req, res, next) {
  req.session.destroy(err => {
    res.sendStatus(200)
  })
})




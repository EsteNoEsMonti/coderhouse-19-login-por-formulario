El proyecto puede ser iniciado con el comando
$ npm test

MONGODB_CNX_STR = 'mongodb://127.0.0.1:27017/ecommerce')

Las sesiones duran 3 minutos!
store: MongoStore.create({ mongoUrl: MONGODB_CNX_STR, ttl: 3*60 }),
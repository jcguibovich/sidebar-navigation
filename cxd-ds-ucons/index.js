const express = require('express')
const app = module.exports.app = exports.app = express();
const port = 3500
process.env.NODE_ENV = 'prod'
// console.log(process.env)

if (process.env.NODE_ENV === 'prod') {
  app.get('/src/demo', (req, res) => res.send('Ucon Central'))
} else {
  app.get('/src/injector', (req, res) => res.send('Ucon Central'))
}

app.listen(port, () => console.log(`Server listening on port ${port}!`))

app.use(require('connect-livereload')())

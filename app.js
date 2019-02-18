var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
require('./routes/authentication')
require('./routes/account')
require('./model/sessions')
const session = require('express-session')
var hash = require('object-hash')

var app = express()
require('./model/db.js')
const authenticationRouter = require('./routes/authentication')
const accountRouter = require('./routes/account')
const serviceRouter = require('./routes/service')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({
  secret: 'ssshhh'
}))

app.use('/', serviceRouter)
app.use('/', authenticationRouter)
app.use('/', accountRouter)
app.use(function (req, res, next) {
  next(createError(404))
})


app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app

import createError from 'http-errors'
import express, { json, urlencoded } from 'express'
import { join } from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import fs from 'fs'
import path from 'path'
// const fs = require('fs')
// var path = require('path')

import listRouter from './routes/listRouter'
import indexRouter from './routes/indexRouter'
// import usersRouter from './routes/users'

import mongoose from 'mongoose'
mongoose.set('useUnifiedTopology', true)
mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
mongoose.connect('mongodb://localhost:27017/listdemo')

var app = express()

const allowedOrigins = ['http://localhost:3000', 'http://listdemo.earendel.se', 'https://listdemo.earendel.se']

app.use(function(req, res, next) {
  var origin = req.headers.origin
  if (allowedOrigins.indexOf(origin) > -1) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  }
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS, DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  res.header('Access-Control-Allow-Credentials', true)

  return next()
})

// view engine setup
app.set('views', join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(json())
app.use(urlencoded({ extended: false }))
app.use(cookieParser())
app.use('/todo', listRouter)

// app.use(express.static(join(__dirname, 'public')))
var absolutePath = path.resolve('../frontend/build')

try {
  if (fs.existsSync(absolutePath)) {
    // console.log('SPACETAG: app.js', 'aha!')
    app.use(express.static(absolutePath))
    app.get('/*', function(req, res) {
      res.sendFile(path.join(absolutePath, 'index.html'))
    })
  } else {
    app.use('/', indexRouter)
  }
} catch (err) {
  console.error(err)
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  // console.log('SPACETAG: app.js', 'ERROR')
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

export default app

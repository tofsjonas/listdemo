var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'JONAS' })
})
router.get('/list', function(req, res, next) {
  res.json({ title: 'LIST' })
})
router.post('/newlist', function(req, res, next) {
  res.json({ title: 'LIST' })
})
router.put('/newlistitem', function(req, res, next) {
  res.json({ title: 'LIST' })
})

module.exports = router

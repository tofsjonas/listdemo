var express = require('express')
import { createList, getAllLists } from '../controllers/listController'
var router = express.Router()

router.get('/', function(req, res, next) {
  res.render('index', { title: 'JONAS' })
})
router.get('/lists', function(req, res, next) {
  getAllLists()
    .then(lists => {
      return res.json({ status: 'OK', lists })
    })
    .catch(err => {
      return res.json({ status: 'ERROR', message: err.message })
    })
})

router.post('/list', function(req, res, next) {
  const { listName } = req.body
  createList({ name: listName })
    .then(list => {
      return res.json({ status: 'OK', list })
    })
    .catch(err => {
      return res.json({ status: 'ERROR', message: err.message })
    })
})

router.put('/listitem', function(req, res, next) {
  res.json({ title: 'LIST' })
})

export default router

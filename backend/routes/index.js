var express = require('express')
import { createList, getAllLists, addListItem, deleteListItem, updateListItem, updateList } from '../controllers/listController'
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
  const { listTitle } = req.body
  createList({ title: listTitle })
    .then(list => {
      return res.json({ status: 'OK', list })
    })
    .catch(err => {
      return res.json({ status: 'ERROR', message: err.message })
    })
})
// router.post('/list', function(req, res, next) {
//   const { listTitle } = req.body
//   createList({ title: listTitle })
//     .then(list => {
//       return res.json({ status: 'OK', list })
//     })
//     .catch(err => {
//       return res.json({ status: 'ERROR', message: err.message })
//     })
// })

router.put('/additem/:list_id', function(req, res, next) {
  const { list_id } = req.params
  addListItem({ list_id })
    .then(item => {
      console.log('SPACETAG: index.js', item)
      return res.json({ status: 'OK', item })
    })
    .catch(err => {
      return res.json({ status: 'ERROR', message: err.message })
    })
})
router.put('/updatelist/:list_id', function(req, res, next) {
  const { list_id } = req.params
  const data = req.body
  // console.log('SPACETAG: index.js', list_id, req.body)
  updateList({ list_id, data })
    .then(list => {
      // console.log('SPACETAG: index.js', list)
      return res.json({ status: 'OK', list })
    })
    .catch(err => {
      return res.json({ status: 'ERROR', message: err.message })
    })
})

router.put('/updateitem/:list_id:item_id', function(req, res, next) {
  const { list_id } = req.params
  const { data } = req.body
  updateListItem({ data })
    .then(item => {
      console.log('SPACETAG: index.js', item)
      return res.json({ status: 'OK', item })
    })
    .catch(err => {
      return res.json({ status: 'ERROR', message: err.message })
    })
})
router.delete('/deleteitem/:list_id/:item_id', function(req, res, next) {
  const { list_id, item_id } = req.params

  deleteListItem({ list_id, item_id })
    .then(() => {
      return res.json({ status: 'OK' })
    })
    .catch(err => {
      return res.json({ status: 'ERROR', message: err.message })
    })
})

// //ADD TO LIST
// router.put('/:_id/:checksum/addtolist/:listName', (req, res) => {
//   const { _id, checksum, listName } = req.params
//   addListItem({ _id, checksum, listName })
//     .then(data => {
//       return res.json({ status: 'OK', data })
//     })
//     .catch(err => {
//       return res.json({ status: 'ERROR', message: err.message })
//     })
// })

export default router

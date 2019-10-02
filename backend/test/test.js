import assert, { doesNotReject } from 'assert'
import mocha from 'mocha'
import chai from 'chai'
// var chai = require('chai')
var chaiAsPromised = require('chai-as-promised')
import mongoose from 'mongoose'
import { deleteList, createList, addListItem, updateListItem, updateList, getAllLists, deleteListItem } from '../controllers/ListController'

// mongoose.connection.collections['sheet'].drop(function(err) {
//   console.log('collection dropped')
// })
chai.use(chaiAsPromised)

// Then either:
var expect = chai.expect

describe('Database', function() {
  before(function(done) {
    mongoose.set('useUnifiedTopology', true)
    mongoose.set('useNewUrlParser', true)
    mongoose.set('useNewUrlParser', true)
    mongoose.set('useFindAndModify', false)
    mongoose.set('useCreateIndex', true)
    mongoose.connect('mongodb://localhost:27017/listdemotest')
    const db = mongoose.connection
    db.dropDatabase()

    db.on('error', console.error.bind(console, 'connection error'))
    db.once('open', function() {
      console.log('We are connected to test database!')
      done()
    })
  })
  after(function(done) {
    mongoose.connection.close(done)
    // mongoose.connection.db.dropDatabase(function() {
    //   mongoose.connection.close(done)
    // })
  })
  var testList = null
  var testItem = null
  describe('createList', function() {
    it('should create a list with title "lista 1"', function(done) {
      createList()
        .then(list => {
          testList = list
          assert.equal(list.title, ['lista 1'])
          done()
        })
        .catch(err => {
          done(err)
        })
    })
  })
  describe('getAllLists', function() {
    it('should should have a length of 1', function(done) {
      getAllLists()
        .then(res => {
          assert.equal(res.length, 1)
          done()
        })
        .catch(err => {
          done(err)
        })
    })
  })
  describe('addListItem', function() {
    it('should add an item to "testlist" with the title "[list item]"', function(done) {
      addListItem({ list_id: testList._id })
        .then(item => {
          testItem = item
          assert.equal(item.title, '[list item]')
          done()
        })
        .catch(err => {
          done(err)
        })
    })
  })
  describe('updateList', () => {
    it('should update title of "testlist" to "Nirvana songs"', done => {
      updateList({ list_id: testList._id, data: { title: 'Nirvana songs' } })
        .then(list => {
          assert.equal(list.title, 'Nirvana songs')
          done()
        })
        .catch(err => {
          done(err)
        })
    })
  })
  describe('updateListItem', () => {
    it('should set "Come as you are" in "Nirvana Songs" to "Smells like teen spirit"', done => {
      updateListItem({ list_id: testList._id, item_id: testItem._id, data: { title: 'Smells like teen spirit' } })
        .then(item => {
          assert.equal(item.title, 'Smells like teen spirit')
          done()
        })
        .catch(err => {
          done(err)
        })
    })
    it('should set "Smells like teen spirit" in "Nirvana Songs" done to true', done => {
      updateListItem({ list_id: testList._id, item_id: testItem._id, data: { done: true } })
        .then(item => {
          assert.equal(item.done, true)
          done()
        })
        .catch(err => {
          done(err)
        })
    })
  })
  describe('deleteListItem', function() {
    it('should delete "Come as you are from " "Nirvana Songs" and return "DELETE LIST ITEM OK"', function(done) {
      deleteListItem({ list_id: testList._id, item_id: testItem._id })
        .then(res => {
          assert.equal(res, 'DELETE LIST ITEM OK')
          done()
        })
        .catch(err => {
          done(err)
        })
    })
  })

  describe('deleteList', function() {
    it('should delete "Nirvana Songs" and return "DELETE LIST OK"', function(done) {
      deleteList({ list_id: testList._id })
        .then(res => {
          assert(res, 'DELETE LIST OK')
          done()
        })
        .catch(err => {
          done(err)
        })
    })
  })
})

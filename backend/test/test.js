import assert, { doesNotReject } from 'assert'
import mocha from 'mocha'
import chai from 'chai'
// var chai = require('chai')
var chaiAsPromised = require('chai-as-promised')
import mongoose from 'mongoose'
import { deleteList, createList, addListItem, toggleListItem, updateListItemName, updateListName, getAllLists, deleteListItem } from '../controllers/ListController'

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
    it('should create a list with name "testlist"', function(done) {
      createList({ name: 'testlist' })
        .then(list => {
          testList = list
          assert.equal(list.name, 'testlist')
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
    it('should add an item to "testlist" with the name "bake a cake"', function(done) {
      addListItem({ list_id: testList._id, data: { name: 'bake a cake' } })
        .then(item => {
          testItem = item
          assert.equal(item.name, 'bake a cake')
          done()
        })
        .catch(err => {
          done(err)
        })
    })
  })
  describe('updateListName', () => {
    it('should update name of "testlist" to "Nirvana songs"', done => {
      updateListName({ list_id: testList._id, name: 'Nirvana songs' })
        .then(list => {
          assert.equal(list.name, 'Nirvana songs')
          done()
        })
        .catch(err => {
          done(err)
        })
    })
  })
  describe('updateListItemName', () => {
    it('should set "bake a cake" in "Nirvana Songs" to "Come as you are"', done => {
      updateListItemName({ list_id: testList._id, item_id: testItem._id, name: 'Come as you are' })
        .then(item => {
          assert.equal(item.name, 'Come as you are')
          done()
        })
        .catch(err => {
          done(err)
        })
    })
  })
  describe('toggleListItem', function() {
    it('should set "done" in "Come as you are" in "Nirvana Songs" to true', function(done) {
      toggleListItem({ list_id: testList._id, item_id: testItem._id })
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

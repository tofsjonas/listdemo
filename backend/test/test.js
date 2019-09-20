import assert, { doesNotReject } from 'assert'
import mocha from 'mocha'
import chai from 'chai'
// var chai = require('chai')
var chaiAsPromised = require('chai-as-promised')
import mongoose from 'mongoose'
import { createList, addListItem, toggleListItem, changeListItemName, changeListName } from '../controllers/ListController'

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

  var theList = null
  var theItem = null
  describe('createList', function() {
    it('should create a list with name "testlist"', function(done) {
      createList({ name: 'testlist' })
        .then(list => {
          theList = list
          assert.equal(list.name, 'testlist')
          done()
        })
        .catch(err => {
          done(err)
        })
    })
  })

  describe('changeListName', () => {
    it('should change name of "testlist" to "Nirvana songs"', done => {
      changeListName({ _id: theList._id, name: 'Nirvana songs' })
        .then(list => {
          assert.equal(list.name, 'Nirvana songs')
          done()
        })
        .catch(err => {
          done(err)
        })
    })
  })

  describe('addListItem', function() {
    it('should add an item to "testlist" with the name "bake a cake"', function(done) {
      addListItem({ _id: theList._id, data: { name: 'bake a cake' } })
        .then(item => {
          theItem = item
          // console.log('SPACETAG: test.js', item)

          assert.equal(item.name, 'bake a cake')
          done()
        })
        .catch(err => {
          done(err)
        })
    })
  })

  describe('changeListItemName', () => {
    it('should change "bake a cake" in "testlist" to "sell daisies"', done => {
      changeListItemName({ list_id: theList._id, item_id: theItem._id, name: 'sell daisies' })
        .then(item => {
          assert.equal(item.name, 'sell daisies')
          done()
        })
        .catch(err => {
          done(err)
        })
    })
  })

  describe('toggleListItem', function() {
    it('should set "bake a cake" in "testlist" to true', function(done) {
      toggleListItem({ list_id: theList._id, item_id: theItem._id })
        .then(item => {
          assert(item.done, true)
          done()
        })
        .catch(err => {
          done(err)
        })
    })
  })
  describe('deleteListItem', function() {})
  describe('deleteList', function() {})
})

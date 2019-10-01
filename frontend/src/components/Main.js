import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { ListContext } from '../contexts/ListContext'
import List from './List'
const Main = () => {
  const { lists, dispatch, serverUrl } = useContext(ListContext)
  const [listTitle, setListTitle] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const handleChange = e => {
    setListTitle(e.target.value)
  }

  useEffect(() => {
    dispatch({ type: 'FETCH_INIT' })
    axios
      .get(serverUrl + '/lists', { crossdomain: true })
      .then(function(response) {
        const { status, lists, message } = response.data
        if (status === 'OK') {
          dispatch({ type: 'FETCH_SUCCESS', payload: lists })
          setIsLoading(false)
        } else {
          setIsLoading(false)
        }
      })
      .catch(function(error) {
        setIsLoading(false)
        // dispatch({ type: 'FETCH_FAILURE', payload: error.message })
      })
  }, [])

  const handleSubmit = e => {
    e.preventDefault()
    axios
      .post(serverUrl + '/list', { listTitle }, { crossdomain: true })
      .then(function(response) {
        const { status, list, message } = response.data
        console.log('SPACETAG: Main.js', response.data)
        if (status === 'OK') {
          dispatch({ type: 'CREATE_LIST', payload: list })
        } else {
          dispatch({ type: 'CREATE_FAILURE', payload: message })
        }
      })
      .catch(function(error) {
        dispatch({ type: 'CREATE_FAILURE', payload: error.message })
      })
    setListTitle('')
  }

  return (
    <main className="app-main">
      <form onSubmit={handleSubmit} className="create-list-form">
        <input type="text" required name="title" value={listTitle} placeholder="skapa en lista" onChange={handleChange} />
        <input type="submit" value="lägg till" />
      </form>

      {lists.length === 0 && (
        <div className="notification">
          <div className="center">
            <p>det finns inga listor :(</p>
            <p>men du kan skapa en!</p>
          </div>
        </div>
      )}
      {lists.length > 0 && (
        <div className="lists">
          {lists.map(list => (
            <List list={list} key={list._id} />
          ))}
        </div>
      )}
    </main>
  )
}
export default Main

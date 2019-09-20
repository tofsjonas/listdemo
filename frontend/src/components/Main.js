import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { ListContext } from '../contexts/ListContext'
import Lists from './Lists'
const Main = () => {
  const { lists, dispatch, serverUrl } = useContext(ListContext)
  const [listName, setListName] = useState('')

  useEffect(() => {
    dispatch({ type: 'FETCH_INIT' })
    axios
      .get(serverUrl + '/lists', { crossdomain: true })
      .then(function(response) {
        const { status, lists, message } = response.data
        if (status === 'OK') {
          dispatch({ type: 'FETCH_SUCCESS', payload: lists })
        } else {
          dispatch({ type: 'FETCH_FAILURE', payload: message })
        }
      })
      .catch(function(error) {
        dispatch({ type: 'FETCH_FAILURE', payload: error.message })
      })
  }, [])

  const handleChange = e => {
    setListName(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    axios
      .post(serverUrl + '/list', { listName }, { crossdomain: true })
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
    setListName('')
  }

  return (
    <main className="App-main">
      {lists.length === 0 && (
        <div className="notification">
          <div className="center">
            <p>det finns inga listor :(</p>
            <p>men du kan skapa en!</p>
          </div>
        </div>
      )}
      {lists.length > 0 && <Lists />}
      <form onSubmit={handleSubmit}>
        <input type="text" required name="listName" value={listName} placeholder="skapa en lista" onChange={handleChange} />
        <input type="submit" value="lägg till" />
      </form>
    </main>
  )
}
export default Main

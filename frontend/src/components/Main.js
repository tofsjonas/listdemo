import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { ListContext } from '../contexts/ListContext'
import List from './List'
const Main = () => {
  const { lists, dispatch, serverUrl } = useContext(ListContext)
  const [listTitle, setListTitle] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  // const handleChange = e => {
  //   setListTitle(e.target.value)
  // }

  useEffect(() => {
    dispatch({ type: 'FETCH_INIT' })
    axios
      .get(serverUrl + '/lists', { crossdomain: true })
      .then(response => {
        const { status, lists, message } = response.data
        if (status === 'OK') {
          dispatch({ type: 'FETCH_SUCCESS', payload: lists })
          setIsLoading(false)
        } else {
          setIsLoading(false)
          alert(message)
        }
      })
      .catch(error => {
        setIsLoading(false)
        alert(error.message)
        // dispatch({ type: 'FETCH_FAILURE', payload: error.message })
      })
  }, [dispatch, serverUrl])
  const createList = () => {
    axios
      .post(serverUrl + '/list', {}, { crossdomain: true })
      .then(response => {
        const { status, list, message } = response.data
        if (status === 'OK') {
          dispatch({ type: 'CREATE_LIST', payload: list })
        } else {
          dispatch({ type: 'CREATE_FAILURE', payload: message })
        }
      })
      .catch(error => {
        dispatch({ type: 'CREATE_FAILURE', payload: error.message })
      })
    setListTitle('')
  }

  // const handleSubmit = e => {
  //   e.preventDefault()
  //   axios
  //     .post(serverUrl + '/list', { listTitle }, { crossdomain: true })
  //     .then(response => {
  //       const { status, list, message } = response.data
  //       if (status === 'OK') {
  //         dispatch({ type: 'CREATE_LIST', payload: list })
  //       } else {
  //         dispatch({ type: 'CREATE_FAILURE', payload: message })
  //       }
  //     })
  //     .catch(error => {
  //       dispatch({ type: 'CREATE_FAILURE', payload: error.message })
  //     })
  //   setListTitle('')
  // }
  //      <form onSubmit={handleSubmit} className="create-list-form">
  //       <input type="text" required name="title" value={listTitle} placeholder="skapa en lista" onChange={handleChange} />
  //       <input type="submit" value="lägg till" />
  //     </form>

  return (
    <>
      <div className="list create-list" onClick={createList}>
        <i className="icon-plus" />
      </div>

      {lists.length === 0 && isLoading && (
        <div className="notification">
          <p>fetching from database...</p>
        </div>
      )}

      {lists.length === 0 && !isLoading && (
        <div className="notification">
          <p>there are no lists :(</p>
          <p>but you can create one! :)</p>
        </div>
      )}
      {lists.length > 0 && (
        <div className="lists">
          {lists.map(list => (
            <List list={list} key={list._id} />
          ))}
        </div>
      )}
    </>
  )
}
export default Main

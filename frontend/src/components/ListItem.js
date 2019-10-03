import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { ListContext } from '../contexts/ListContext'

const ListItem = ({ listId, item }) => {
  const { dispatch, serverUrl } = useContext(ListContext)
  const [title, setTitle] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    setDone(item.done)
    setTitle(item.title)
  }, [item])
  const handleChange = e => {
    setTitle(e.target.value)
  }
  const toggleDone = () => {
    save({ done: !done })
  }
  const selectInput = e => {
    e.target.select()
  }
  const save = data => {
    axios
      .put(serverUrl + '/updateitem/' + listId + '/' + item._id, { data }, { crossdomain: true })
      .then(function(response) {
        const { status, item, message } = response.data
        if (status === 'OK') {
          dispatch({ type: 'UPDATE_LIST_ITEM', payload: { listId, item } })
        } else {
          alert(message)
        }
      })
      .catch(function(error) {
        alert(error.message)
      })
  }

  const deleteItem = () => {
    const itemId = item._id
    axios
      .delete(serverUrl + '/deleteitem/' + listId + '/' + itemId, { crossdomain: true })
      .then(function(response) {
        // console.log('SPACETAG: ListItem.js', response.data)
        const { status, message } = response.data
        if (status === 'OK') {
          dispatch({ type: 'DELETE_LIST_ITEM', payload: { listId, itemId } })
        } else {
          alert(message)
        }
      })
      .catch(function(error) {
        alert(error.message)
      })

    // console.log('SPACETAG: ListItem.js', 'deleting', listId, item._id)
  }

  const saveTitle = () => {
    const newTitle = title.trim()
    if (newTitle !== item.title) {
      save({ title: newTitle })
    }
  }

  return (
    <div className="list-item">
      <i className={'icon-check' + (done ? '' : '-empty')} onClick={toggleDone} />
      <input type="text" value={title} onChange={handleChange} onBlur={saveTitle} onFocus={selectInput} />
      <i className="icon-cancel" onClick={deleteItem} />
    </div>
  )
}
export default ListItem

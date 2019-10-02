import React, { useState, useContext } from 'react'
import axios from 'axios'
import { ListContext } from '../contexts/ListContext'

const ListItem = ({ listId, item }) => {
  const { dispatch, serverUrl } = useContext(ListContext)

  const [title, setTitle] = useState(item.title)
  const [done, setDone] = useState(item.done)
  // console.log('SPACETAG: ListItem.js', listId, item)
  const handleChange = e => {
    setTitle(e.target.value)
  }
  const toggleDone = () => {
    setDone(!done)
  }
  const selectInput = e => {
    e.target.select()
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
      console.log('SPACETAG: ListItem.js SAVING', title)
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

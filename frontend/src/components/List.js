import React, { useContext, useState, useEffect } from 'react'
import ListContextProvider, { ListContext } from '../contexts/ListContext'
import Modal from 'react-modal'
import axios from 'axios'
import ListItem from './ListItem'
// import uniqueId from '../lib/uniqueId'

const List = ({ list }) => {
  const { dispatch, serverUrl } = useContext(ListContext)
  const [title, setTitle] = useState('')
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    setTitle(list.title)
  }, [list])

  const handleChange = e => {
    setTitle(e.target.value)
  }
  const toggleActive = () => {
    setIsActive(!isActive)
  }
  const saveTitle = () => {
    const newTitle = title.trim()
    if (newTitle !== list.title) {
      axios
        .put(serverUrl + '/updatelist/' + list._id, { title: newTitle }, { crossdomain: true })
        .then(function(response) {
          const { status, item, message } = response.data
          if (status === 'OK') {
            dispatch({ type: 'UPDATE_LIST_ITEM', payload: { list, item } })
          } else {
            alert(message)
          }
        })
        .catch(function(error) {
          alert(error.message)
        })
    }
  }
  const deleteList = () => {
    if (window.confirm('Are you sure you wish to delete this list?')) {
      axios
        .delete(serverUrl + '/deletelist/' + list._id, { crossdomain: true })
        .then(function(response) {
          const { status, message } = response.data
          if (status === 'OK') {
            dispatch({ type: 'DELETE_LIST', payload: { list } })
          } else {
            alert(message)
          }
        })
        .catch(function(error) {
          alert(error.message)
        })
    }
  }
  const addItem = () => {
    axios
      .put(serverUrl + '/additem/' + list._id, {}, { crossdomain: true })
      .then(function(response) {
        const { status, item, message } = response.data
        if (status === 'OK') {
          dispatch({ type: 'ADD_LIST_ITEM', payload: { list, item } })
        } else {
          alert(message)
        }
      })
      .catch(function(error) {
        alert(error.message)
      })
  }
  const selectInput = e => {
    e.target.select()
  }

  return (
    <div className={'list' + (isActive ? ' active' : '')}>
      <div onClick={toggleActive}>
        <header>
          <h2>{title}</h2>
        </header>
        <main>
          {list.items.length > 0 &&
            list.items.map(item => (
              <div key={item._id}>
                {item.done ? <i className="icon-check" /> : <i className="icon-check-empty" />}
                {item.title}
              </div>
            ))}
        </main>
        <footer>
          <i className="icon-plus" />
          <i className="icon-pencil" />
          <i className="icon-trash-empty" />
        </footer>
      </div>
      <Modal isOpen={isActive} onRequestClose={toggleActive} className="modal" overlayClassName="overlay">
        <input className="list-title-input" type="text" value={title} onChange={handleChange} onBlur={saveTitle} onFocus={selectInput} />
        {list.items.length > 0 && (
          <div className="list-items">
            {list.items.map(item => (
              <ListItem key={item._id} listId={list._id} item={item} />
            ))}
          </div>
        )}
        <div className="add-list-item" onClick={addItem}>
          <i className="icon-plus" />
        </div>
        <i className="icon-trash-empty list-modal" onClick={deleteList} />
      </Modal>
    </div>
  )
}
export default List

// const customStyles = {
//   overlay: {
//     backgroundColor: 'rgba(0, 0, 0, 0.8)',
//   },

//   content: {
//     border: 'none',
//     textAlign: 'left',
//     backgroundColor: '#eee',

//     top: '50%',
//     left: '50%',
//     right: 'auto',
//     minWidth: '50vw',
//     bottom: 'auto',
//     marginRight: '-50%',
//     transform: 'translate(-50%, -50%)',
//   },
// }

import React, { useContext, useState } from 'react'
import ListContextProvider, { ListContext } from '../contexts/ListContext'
import Modal from 'react-modal'
import axios from 'axios'
import ListItem from './ListItem'

const List = ({ list }) => {
  const { dispatch, serverUrl } = useContext(ListContext)
  const [title, setTitle] = useState(list.title)
  const [isActive, setIsActive] = useState(false)
  const handleChange = e => {
    setTitle(e.target.value)
  }
  const toggleActive = () => {
    setIsActive(!isActive)
  }
  const saveTitle = () => {
    console.log('SPACETAG: List.js SAVING', title)
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
      <Modal isOpen={isActive} onRequestClose={toggleActive} style={customStyles} contentLabel="Example Modal">
        <i className="icon-trash-empty list-modal" />
        <input className="list-title-input" type="text" value={title} onChange={handleChange} onBlur={saveTitle} />
        {list.items.length > 0 && list.items.map(item => <ListItem key={item._id} listId={list.id} item={item} />)}
        <div className="add-list-item" onClick={addItem}>
          <i className="icon-plus" /> add list item
        </div>
      </Modal>
    </div>
  )
}
export default List

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },

  content: {
    border: 'none',
    textAlign: 'left',
    backgroundColor: '#eee',

    top: '30%',
    left: '50%',
    right: 'auto',
    minWidth: '50vw',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
}

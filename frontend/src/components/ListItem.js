import React, { useState } from 'react'
const ListItem = ({ listId, item }) => {
  const [title, setTitle] = useState(item.title)
  // console.log('SPACETAG: ListItem.js', listId, item)
  const handleChange = e => {
    setTitle(e.target.value)
  }

  return (
    <div className="li">
      {item.done ? <i className="icon-check" /> : <i className="icon-check-empty" />}
      <input type="text" value={title} onChange={handleChange} />
    </div>
  )
}
export default ListItem

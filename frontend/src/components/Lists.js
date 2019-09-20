import React, { useContext } from 'react'
import { ListContext } from '../contexts/ListContext'
const Lists = () => {
  const { lists, dispatch, serverUrl } = useContext(ListContext)

  const ListRows = () => {
    const ret = []
    for (let i = 0; i < lists.length; i++) {
      const element = lists[i]
      ret.push(
        <div className="list-row" key={i}>
          deletebutton &nbsp;
          {element.name}
        </div>
      )
    }
    return ret
  }

  return (
    <div className="lists">
      <ListRows />
    </div>
  )
}
export default Lists

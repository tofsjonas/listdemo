import React, { createContext, useReducer } from 'react'
import { listReducer } from './listReducer'
export const ListContext = createContext()

const initialState = {
  lists: [],
}

const ListContextProvider = ({ children }) => {
  var loc = window.location
  const serverUrl = loc.hostname === 'localhost' ? 'http://localhost:3002/todo' : loc.protocol + '//' + loc.host + '/todo'
  const [state, dispatch] = useReducer(listReducer, initialState)
  return <ListContext.Provider value={{ lists: state.lists, dispatch, serverUrl }}>{children}</ListContext.Provider>
}

export default ListContextProvider

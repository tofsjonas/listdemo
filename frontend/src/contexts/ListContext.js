import React, { createContext, useReducer } from 'react'
import { listReducer } from './listReducer'
export const ListContext = createContext()

const initialState = {
  lists: [],
  isLoading: true,
  isSaving: false,
  loadError: false,
  saveError: false,
}

const ListContextProvider = ({ children }) => {
  const serverUrl = window.location.hostname === 'localhost' ? 'http://localhost:3002' : 'https://earendel.se/listdemo'
  const [state, dispatch] = useReducer(listReducer, initialState)
  return <ListContext.Provider value={{ lists: state.lists, dispatch, serverUrl }}>{children}</ListContext.Provider>
}

export default ListContextProvider

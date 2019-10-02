import React, { useEffect } from 'react'
import ListContextProvider from './contexts/ListContext'
import Main from './components/Main'
import Modal from 'react-modal'

function App() {
  useEffect(() => {
    Modal.setAppElement('.app')
  }, [])

  return (
    <ListContextProvider>
      <div className="app">
        <header className="app-header">
          <p>a simple todo list demo</p>
        </header>
        <main className="app-main">
          <Main />
        </main>
        <footer className="app-footer">
          <p>footer</p>
        </footer>
      </div>
    </ListContextProvider>
  )
}

export default App

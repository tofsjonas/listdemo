import React from 'react'
import ListContextProvider from './contexts/ListContext'
import Main from './components/Main'

function App() {
  return (
    <ListContextProvider>
      <div className="App">
        <header className="App-header">
          <p>a simple todo list demo</p>
        </header>
        <Main />
        <footer className="App-footer">
          <p>footer</p>
        </footer>
      </div>
    </ListContextProvider>
  )
}

export default App

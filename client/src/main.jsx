import React from 'react'
import ReactDOM from 'react-dom'
import { TransactionProvider } from './context/TransactionContext'
import './index.css'
import App from './App'

ReactDOM.render(
  <TransactionProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </TransactionProvider>
  ,
  document.getElementById('root')
)

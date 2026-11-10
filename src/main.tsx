import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { initClickTracking } from './analytics'

initClickTracking()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

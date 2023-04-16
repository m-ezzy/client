import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './components/App'

import { UsersProvider } from './contexts/Users'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
		<UsersProvider>
      <App />
		</UsersProvider>
  // </React.StrictMode>,
)

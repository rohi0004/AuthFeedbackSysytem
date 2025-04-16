import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { GoogleOAuthProvider } from '@react-oauth/google'

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <GoogleOAuthProvider clientId="1034332415290-qal82rqg2ktbpq2r49oftak7hm8dq3rf.apps.googleusercontent.com">
      <BrowserRouter>
        <App />
      </BrowserRouter>
      <ToastContainer />
    </GoogleOAuthProvider>
  </>
)

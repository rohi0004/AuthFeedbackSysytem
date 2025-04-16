import { Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Layout from './layout/Layout'
import UserContextProvider from './context/UserContextProvider'
import Account from './components/Account'
import VerifyOtp from './components/VerifyOtp'
import Page404 from './components/Page404'
import Authrequired from './utils/Authrequired'
import ForgotPass from './components/ForgotPass'
import ResetPassword from './components/ResetPassword'
import Register from './components/Register'
import FeedbackForm from './components/FeedbackForm'

const App = () => {
  return (
    <>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={
                <>
                  <Login />
                </>
              }
            />
            <Route path="/register" element={<Register/>} />
            <Route path="/verify-otp" element={<VerifyOtp />} />
            <Route element={<Authrequired />}>
              <Route path="/feedback" element={<FeedbackForm />} />
              <Route path="/feedback/:id" element={<FeedbackForm />} />
              <Route path="/dashboard" element={<Account />} />
            </Route>
            <Route path="/forgot-password" element={<ForgotPass />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="*" element={<Page404 />} />
            {/* <Route path="/feedback" element={<FeedbackForm />} /> */}
          </Route>
        </Routes>
      </UserContextProvider>
    </>
  )
}

export default App
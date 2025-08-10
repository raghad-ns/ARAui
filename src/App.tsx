import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import ViewPatients from './patients/pages/view-patients/view-patients'
import AuthComponent from './auth/auth-page'
import Home from './home/home'
import SinglePatient from './patients/pages/single-patient/single-patient'
import Header from './common/header/header'
import SessionDetails from './exercise-sessions/pages/session-details/session-details'
import { useContext } from 'react'
import { UserContext } from './providers/User/UserProvider'

function App() {
  const { user } = useContext(UserContext);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/patients' element={<ViewPatients />} />
        <Route path='/patientSessions/:patientId' element={<SinglePatient />} />
        {/* <Route path='/auth' element={<AuthComponent />} /> */}
        {/*  If user is logged in, show Home, else show Auth */}
        <Route path='/' element={user ? <Home /> : <AuthComponent />} />
        <Route path='/home' element={ <Home />} />
        <Route path="/sessionDetails/:sessionId" element={<SessionDetails />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

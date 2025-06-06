
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import ViewPatients from './patients/pages/view-patients/view-patients'
import AuthComponent from './auth/auth-page'
import Home from './home/home'
import SinglePatient from './patients/pages/single-patient/single-patient'
import Header from './common/header/header'
import SessionDetails from './exercise-sessions/pages/session-details/session-details'

function App() {

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/patients' element={<ViewPatients />} />
          <Route path='/patientSessions/:patientId' element={<SinglePatient />} />
          <Route path='/auth' element={<AuthComponent />} />
          <Route path='/' element={<Home />} />
          <Route path="/sessionDetails/:sessionId" element={<SessionDetails />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App


import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import ViewPatients from './patients/pages/view-patients/view-patients'
import ScheculedSessions from './exercise-sessions/pages/view-sessions/scheduled-sessions'
import AuthComponent from './auth/auth-page'
import PatientDashboard from './dashboard/dashboard'
import Home from './home/home'
import SinglePatient from './patients/pages/single-patient/single-patient'
import Header from './common/header/header'

function App() {

  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path='/patients' element={<ViewPatients />} />
          <Route path='/patients/:id' element={<SinglePatient />} />
          <Route path="/sessions/:patientId" element={<ScheculedSessions />} />
          <Route path='/auth' element={<AuthComponent />} />
          <Route path='/' element={<Home />} />
          <Route path="/dashboard/:patientId" element={<PatientDashboard />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

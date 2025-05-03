
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import ViewPatients from './patients/pages/view-patients/view-patients'
import AuthComponent from './auth/auth-page'
import PatientDashboard from './dashboard/dashboard'
import Home from './home/home'
import SinglePatient from './patients/pages/single-patient/single-patient'
import ScheduledSessions from './exercise-sessions/pages/view-sessions/scheduled-sessions'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/patients' element={<ViewPatients/>}/>
          <Route path='/patients/:id' element={<SinglePatient/>}/>
          <Route path="/patients/:patientId/sessions" element={<ScheduledSessions />} />
          <Route path='/auth' element={<AuthComponent/>}/>
          <Route path='/' element={<Home/>}/>
          <Route path="/dashboard/:patientId" element={<PatientDashboard />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

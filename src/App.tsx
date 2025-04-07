
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import ViewPatients from './patients/pages/view-patients'
import ScheculedSessions from './exercise-sessions/pages/scheduled-sessions'
import AuthComponent from './auth/auth-page'
import PatientDashboard from './dashboard/dashboard'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/patients' element={<ViewPatients/>}/>
          <Route path="/sessions/:patientId" element={<ScheculedSessions />} />
          <Route path='/auth' element={<AuthComponent/>}/>
          <Route path='/' element={<AuthComponent/>}/>
          <Route path="/dashboard/:patientId" element={<PatientDashboard />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

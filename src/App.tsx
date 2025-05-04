
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import ViewPatients from './patients/pages/view-patients/view-patients'
import AuthComponent from './auth/auth-page'
import PatientDashboard from './exercise-sessions/components/dashboard/dashboard'
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
          <Route path='/patients/:patientId' element={<SinglePatient />} />
          <Route path='/auth' element={<AuthComponent />} />
          <Route path='/' element={<Home />} />
          <Route path="/sessionDetails/:sessionId" element={<PatientDashboard />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

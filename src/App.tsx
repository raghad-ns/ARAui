
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import ViewPatients from './patients/pages/view-patients'
import ScheculedSessions from './exercise-sessions/pages/scheduled-sessions'
import AuthComponent from './auth/auth-page'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/patients' element={<ViewPatients/>}/>
          <Route path='/scheduledSessions' element={<ScheculedSessions/>}/>
          <Route path='/auth' element={<AuthComponent/>}/>
          <Route path='/' element={<AuthComponent/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

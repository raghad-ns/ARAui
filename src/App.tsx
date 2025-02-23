
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import ViewPatients from './patients/pages/view-patients'
import ScheculedSessions from './exercise-sessions/pages/scheduled-sessions'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/patients' element={<ViewPatients/>}/>
          <Route path='/scheduledSessions' element={<ScheculedSessions/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

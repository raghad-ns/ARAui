import React, { useEffect } from 'react'
import './header.css'
import { useLocation } from 'react-router-dom'


const Header = () => {
  const pathname = useLocation().pathname;
  return (
    <div className='headerWrapper'>
      <div className="leftSide">
        <div className="logo">
          <img src=".\araLogo_-_Copy-removebg-preview.png" alt="" />
        </div>
        <div className="title">
          {
            pathname.includes("patients")
              ? "Patients"
              : pathname.includes('sessionDetails')
                ? "Session details"
                : pathname.includes('patientSessions')
                  ? 'Excercise sessions'
                  : ''
          }
        </div>
      </div>
      <div className="rightSide">
        User
      </div>
    </div>
  )
}

export default Header
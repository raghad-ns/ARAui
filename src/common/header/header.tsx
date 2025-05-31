import React from 'react'
import './header.css'

const Header = () => {
  return (
    <div className='headerWrapper'>
      <div className="leftSide">
        <div className="logo">
          <img src=".\araLogo_-_Copy-removebg-preview.png" alt="" />
        </div>
        <div className="title">
          {
            window.location.pathname.includes("patients")
              ? "Patients" 
              : window.location.pathname.includes('sessionDetails') 
              ? "Session details" 
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
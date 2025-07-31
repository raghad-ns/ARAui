import React from 'react'
import './header.css'
import { useLocation } from 'react-router-dom'
import { UserContext } from '../../providers/User/UserProvider';


const Header = () => {
  const pathname = useLocation().pathname;
  const user = React.useContext(UserContext);
  console.log("user: ", user.user)
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
      {
        user.user &&
        <div className="rightSide">
          User
        </div>
      }
    </div>
  )
}

export default Header
import React, { useEffect } from 'react'
import './home.css'
import { auth } from '../firebase-config'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate();
    // useEffect(() => {
    //     if (!auth.currentUser) {
    //         navigate('/auth')
    //     }
    // }, [])
    return (
        <div className='homePage'>
            <img src="https://media.istockphoto.com/id/1152834631/photo/physical-therapists-are-checking-patients-elbows-at-the-clinic-office-room.jpg?s=612x612&w=0&k=20&c=erAKQEPWGdLCTdJTAM-74yC-Sf9NTYP8_cJI524Bwpo=" alt="" />
            <div className="homeContent">
                <div className='navigationButtons'>
                    <h2>Pages</h2>
                    <button
                        onClick={() => navigate('/patients')}
                    >
                        Patients
                    </button>
                    <button
                        onClick={() => navigate('/sessions')}
                    >
                        Exercise sessions
                    </button>

                </div>
                <div className='pageTop'>
                    <h1>Arm Rehabelitation \n Assistant Dashboard</h1>
                </div>

            </div>
        </div>
    )
}

export default Home
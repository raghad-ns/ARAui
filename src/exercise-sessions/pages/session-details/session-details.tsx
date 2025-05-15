import React, { useEffect, useState } from 'react'
import SessionDashboard from '../../components/dashboard/dashboard'
import { useParams } from 'react-router-dom';
import { getSessionById, sessionStatus } from '../../sessions-functions';
import { DocumentData } from 'firebase/firestore';
import './session-details.css'

const SessionDetails = () => {
    const { sessionId } = useParams<{ sessionId: string }>();
    const [session, setSession] = useState<DocumentData | null>();
    useEffect(() => {
        getSessionById(sessionId || '').then(currentSession => {
            console.log('current session: ', currentSession)
            setSession(currentSession)
        })
    }, [])
    return (
        <div className='sessionDetails'>
            <div className="sessionInfo">
                <span className={
                    `status ${session?.status == sessionStatus.SCHEDULED
                        ? 'scheduled'
                        : session?.status == sessionStatus.INPROGRESS ?
                            'inProgress'
                            : 'completed'
                    }`}>
                    {sessionStatus[session?.status]}
                </span>
                <div className="plan">
                    <p><b>How therapist planned the session: </b></p>
                    <span>Scheduled at: {session?.date.toString()}</span>
                    <span>Extention angle: {session?.extentionAngle}</span>
                    <span>Flection angle: {session?.flectionAngle}</span>
                    <span>Repetitions: {session?.repetitions}</span>
                </div>
                {
                    (session?.status == sessionStatus.COMPLETED || 1) &&
                    <div className="patientPerformance">
                        <p><b>How patient actually performed: </b></p>
                        <span>Scheduled at: {session?.date.toString()}</span>
                        <span>Extention angle: {session?.extentionAngle}</span>
                        <span>Flection angle: {session?.flectionAngle}</span>
                        <span>Repetitions: {session?.repetitions}</span>
                    </div>
                }
            </div>
            <SessionDashboard sessionId={sessionId || ''} />
        </div>
    )
}

export default SessionDetails
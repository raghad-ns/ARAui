import React, { useEffect, useState } from 'react'
import SessionDashboard from '../../components/dashboard/dashboard'
import { useParams } from 'react-router-dom';
import { getSessionById, sessionStatus } from '../../sessions-functions';
import { DocumentData } from 'firebase/firestore';

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
        <div>
            <div className="sessionInfo">
                <span>status: {sessionStatus[session?.status]}</span>
                <div className="plan">
                    <p>How therapist planned the session: </p>
                    <span>Scheduled at: {session?.date.toString()}</span>
                    <span>Extention angle: {session?.extentionAngle}</span>
                    <span>Flection angle: {session?.flectionAngle}</span>
                    <span>Repetitions: {session?.repetitions}</span>
                </div>
                {
                    session?.status == sessionStatus.COMPLETED &&
                    <div className="patienPerformance">
                        <p>How patient actually performed</p>
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
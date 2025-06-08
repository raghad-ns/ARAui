import { useEffect, useState } from 'react'
// import SessionDashboard from '../../components/dashboard/dashboard'
import { useParams } from 'react-router-dom';
import { getSessionById, sessionStatus } from '../../sessions-functions';
import { DocumentData } from 'firebase/firestore';
import './session-details.css'
import { Line } from "react-chartjs-2";
import "chart.js/auto"; // Import chart.js for auto-configuration
import { fetchRollData } from "../../sessions-functions";

const SessionDetails = () => {
    const { sessionId } = useParams<{ sessionId: string }>();
    const [session, setSession] = useState<DocumentData | null>();

    const [angleData, setAngleData] = useState<number[]>([]); // Initial angle values
    const [labels, setLabels] = useState<string[]>([]); // Initial date labels
    const [patientActivity, setPatientActivity] = useState<string[]>([]); // Initial date labels

    // Chart configurations
    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { display: true },
        },
    };

    useEffect(() => {
        if (session?.status != sessionStatus.COMPLETED) {
            const interval = setInterval(async () => {
                getSessionById(sessionId || '').then(currentSession => {
                    console.log('current session: ', currentSession)
                    setSession(currentSession)
                })
                if (session?.status == sessionStatus.INPROGRESS) {
                    fetchRollData(sessionId, 'roll').then(rollData => {
                        setAngleData(rollData)
                        console.log('roll data from dashboard: ', rollData)
                    })
                    fetchRollData(sessionId, 'patientActivity').then(patientActivity => {
                        setPatientActivity(patientActivity)
                    })
                    fetchRollData(sessionId, 'time').then(time => {
                        const startedAt = Number(time[0]);
                        setLabels(time.map(sample => (Number(sample) - startedAt)))
                    })
                }
            }, 1000); // 10 seconds = 10,000 ms

            return () => clearInterval(interval); // 🔄 Clean up on unmount
        }
    }, []); // Empty dependency array = run once on mount

    useEffect(() => {
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
            <div className="sessionProgressDetails">

                {/* Progress Chart */}
                <div className="charts">
                    {/* Angle Chart */}
                    <div className="chart-container">
                        <h3>Angle Progress</h3>
                        <Line
                            data={{
                                labels,
                                datasets: [{
                                    label: "Patient's elbow angle (°)",
                                    data: angleData,
                                    borderColor: "blue",
                                    fill: false,
                                }],
                            }}
                            options={chartOptions}
                        />
                    </div>
                    {/* Angle Chart */}
                    <div className="chart-container">
                        <h3>Patient motion (active/ passive)</h3>
                        <Line
                            data={{
                                labels,
                                datasets: [{
                                    label: "Patient's activity (0/1)",
                                    data: patientActivity,
                                    borderColor: "green",
                                    fill: false,
                                }],
                            }}
                            options={chartOptions}
                        />
                    </div>
                </div>
            </div>
            {/* <SessionDashboard sessionId={sessionId || ''} /> */}
        </div>
    )
}

export default SessionDetails
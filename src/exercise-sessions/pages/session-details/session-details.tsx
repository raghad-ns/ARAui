import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchٌRealTimeData, getSessionById, sessionStatus } from '../../sessions-functions';
import { DocumentData } from 'firebase/firestore';
import './session-details.css';
import { Line } from "react-chartjs-2";
import "chart.js/auto"; // Import chart.js for auto-configuration
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const SessionDetails = () => {
    const { sessionId } = useParams<{ sessionId: string }>();
    const [session, setSession] = useState<DocumentData | null>(null);
    const [patientInfo, setPatientInfo] = useState<any>(null);
    const [angleData, setAngleData] = useState<number[]>([]); 
    const [labels, setLabels] = useState<string[]>([]); 
    const [patientActivity, setPatientActivity] = useState<string[]>([]); 
    const [angularSpeed, setAngularSpeed] = useState<string[]>([]); 
    const [patientPain, setPatientPain] = useState<string[]>([]); 

    // Chart configurations
    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { display: true },
        },
    };

    const getRealTimeData = () => {
        fetchٌRealTimeData(sessionId, 'roll').then(rollData => {
            setAngleData(rollData);
            console.log('roll data from dashboard: ', rollData);
        });
        fetchٌRealTimeData(sessionId, 'patientActivity').then(patientActivity => {
            setPatientActivity(patientActivity);
        });
        fetchٌRealTimeData(sessionId, 'time').then(time => {
            const startedAt = Number(time[0]);
            setLabels(time.map(sample => (Number(sample) - startedAt).toString()));
        });
        fetchٌRealTimeData(sessionId, 'speed').then(speed => {
            setAngularSpeed(speed);
        });
        fetchٌRealTimeData(sessionId, 'speed').then(pain => {
            setPatientPain(pain);
        });
    };

    useEffect(() => {
        getSessionById(sessionId || '').then(currentSession => {
            console.log('current session: ', currentSession);
            setSession(currentSession);
            console.log('session: ', session);


            if (currentSession?.status === sessionStatus.INPROGRESS) {
                const interval = setInterval(async () => {
                    console.log('fetching session...');
                    getSessionById(sessionId || '').then(currentSession => {
                        console.log('current session: ', currentSession);
                        setSession(currentSession);
                    });
                    getRealTimeData();
                }, 1000);

                return () => clearInterval(interval);
            } else if (currentSession?.status === sessionStatus.COMPLETED) {
                getRealTimeData();
            }
        });
    }, []);
    
    // ✅ Print Report Function
  const handlePrintReport = async () => {
    if (!session) return;

    const pdf = new jsPDF('p', 'mm', 'a4');
    let yPos = 10;

    // ✅ Add Report Title
    pdf.setFontSize(18);
    pdf.text('Session Report', 105, yPos, { align: 'center' });
    yPos += 10;

    // ✅ Add Patient Info (Replace with actual patient data if available)
    pdf.setFontSize(12);

     pdf.text(`Patient Name: ${patientInfo?.name || 'N/A'}`, 10, yPos);
yPos += 6;
pdf.text(`Age: ${patientInfo?.age || 'N/A'}`, 10, yPos);
yPos += 6;
pdf.text(`Therapist: ${session?.therapist || 'N/A'}`, 10, yPos);
    yPos += 10;




    // ✅ Add Session Info
    pdf.text(`Session Date: ${session?.date?.toString()}`, 10, yPos);
    yPos += 6;
    pdf.text(`Extension Angle: ${session?.extentionAngle}`, 10, yPos);
    yPos += 6;
    pdf.text(`Flexion Angle: ${session?.flectionAngle}`, 10, yPos);
    yPos += 6;
    pdf.text(`Repetitions: ${session?.repetitions}`, 10, yPos);
    yPos += 10;

    // ✅ Add Charts
    const chartContainers = document.querySelectorAll('.chart-container canvas');

    for (let i = 0; i < chartContainers.length; i++) {
        const canvas = chartContainers[i] as HTMLCanvasElement;
        const imgData = canvas.toDataURL('image/png');
        const imgWidth = 180;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        if (yPos + imgHeight > 280) { // If chart won't fit, add new page
            pdf.addPage();
            yPos = 10;
        }

        pdf.addImage(imgData, 'PNG', 15, yPos, imgWidth, imgHeight);
        yPos += imgHeight + 10;
    }

    pdf.save(`Session_Report_${sessionId}.pdf`);
};


    return (
        <div className='sessionDetails'>
           
            <div className="sessionInfo">
    <span className={
        `status ${session?.status === sessionStatus.SCHEDULED
            ? 'scheduled'
            : session?.status === sessionStatus.INPROGRESS ?
                'inProgress'
                : 'completed'
        }`}>
        {sessionStatus[session?.status]}
    </span>

    {/* ✅ Move the print button here */}
    {session?.status === sessionStatus.COMPLETED && (
        <button className="print-btn" onClick={handlePrintReport}>Print Report</button>
    )}

    <div className="plan">
        <p><b>How therapist planned the session: </b></p>
        <span>Scheduled at: {session?.date?.toString()}</span>
        <span>Extention angle: {session?.extentionAngle}</span>
        <span>Flection angle: {session?.flectionAngle}</span>
        <span>Repetitions: {session?.repetitions}</span>
    </div>
</div>


            {/* ✅ Print Button (Visible only when COMPLETED) */}
            {session?.status === sessionStatus.COMPLETED && (
                <button className="print-btn" onClick={handlePrintReport}>Print Report</button>
            )}

            <div className="sessionProgressDetails">
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
                                    borderColor: "yellow",
                                    fill: false,
                                }],
                            }}
                            options={chartOptions}
                        />
                    </div>

                    {/* Patient activity Chart */}
                    <div className="chart-container">
                        <h3>Patient motion (active/ passive)</h3>
                        <Line
                            data={{
                                labels,
                                datasets: [{
                                    label: "Patient's activity (0/1)",
                                    data: patientActivity,
                                    borderColor: "orange",
                                    fill: false,
                                }],
                            }}
                            options={chartOptions}
                        />
                    </div>

                    {/* Pain indicator Chart */}
                    <div className="chart-container">
                        <h3>Patient's pain level</h3>
                        <Line
                            data={{
                                labels,
                                datasets: [{
                                    label: "Patient's pain level",
                                    data: patientPain,
                                    borderColor: "green",
                                    fill: false,
                                }],
                            }}
                            options={chartOptions}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SessionDetails;

import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2"; 
import "chart.js/auto"; // Import chart.js for auto-configuration
import './dashboard.css';

const PatientDashboard: React.FC = () => {
  const [angleData, setAngleData] = useState<number[]>([10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120]); // Initial angle values
  const [labels, setLabels] = useState<string[]>([
    "2025-04-01", "2025-04-02", "2025-04-03", "2025-04-04", "2025-04-05", "2025-04-06", "2025-04-07", 
    "2025-04-08", "2025-04-09", "2025-04-10", "2025-04-11", "2025-04-12"
  ]); // Initial date labels

  // Chart configurations
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: true },
    },
  };

  // Function to generate random angle
  const generateRandomAngle = () => {
    return Math.floor(Math.random() * (180 - 10 + 1)) + 10; // Random angle between 10° and 180°
  };

  useEffect(() => {
    // Set interval to add new value every 10 seconds
    const intervalId = setInterval(() => {
      const newAngle = generateRandomAngle(); // Generate a random angle
      const newLabel = new Date().toLocaleDateString(); // Get the current date as a label

      setAngleData((prevAngleData) => [...prevAngleData, newAngle]); // Add new angle to the data
      setLabels((prevLabels) => [...prevLabels, newLabel]); // Add the current date to the labels
    }, 10000); // 10 seconds interval

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <h1>Patient Progress Dashboard</h1>

      {/* Progress Chart */}
      <div className="charts">
        <h2>Progress Over Time</h2>

        {/* Angle Chart */}
        <div className="chart-container">
          <h3>Angle Progress</h3>
          <Line 
            data={{
              labels,
              datasets: [{
                label: "Angle (°)",
                data: angleData,
                borderColor: "blue",
                fill: false,
              }],
            }} 
            options={chartOptions} 
          />
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;



// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { getSessions } from "../exercise-sessions/sessions-functions";
// import { Line, Bar, Pie } from "react-chartjs-2"; 
// import "chart.js/auto"; // Import chart.js for auto-configuration

// const PatientDashboard: React.FC = () => {
//   const { patientId } = useParams<{ patientId: string }>();
//   const [sessions, setSessions] = useState<any[]>([]);

//   useEffect(() => {
//     const fetchSessions = async () => {
//       if (patientId) {
//         const data = await getSessions(patientId);
//         setSessions(data);
//       }
//     };
//     fetchSessions();
//   }, [patientId]);

//   // Extract data for the charts
//   const labels = sessions.map((session) => session.date);
//   const angleData = sessions.map((session) => session.angle);
//   const speedData = sessions.map((session) => session.speed);
//   const repetitionData = sessions.map((session) => session.repetitions);

//   // Chart configurations
//   const chartOptions = {
//     responsive: true,
//     plugins: {
//       legend: { display: true },
//     },
//   };

//   // Donut Chart (for example, representing repetitions)
//   const donutData = {
//     labels: ['Completed', 'Remaining'],
//     datasets: [{
//       label: 'Repetitions',
//       data: [sessions.length > 0 ? sessions[sessions.length - 1].repetitions : 0, 100 - (sessions.length > 0 ? sessions[sessions.length - 1].repetitions : 0)],
//       backgroundColor: ['#36A2EB', '#FF6384'],
//     }],
//   };

//   // Column Chart (for example, representing angle data)
//   const columnData = {
//     labels,
//     datasets: [
//       {
//         label: "Angle (°)",
//         data: angleData,
//         backgroundColor: '#FF5733',  // Color for the bars
//       },
//     ],
//   };

//   return (
//     <div>
//       <h1>Patient Progress Dashboard</h1>

//       {/* Latest Session Summary */}
//       {sessions.length > 0 && (
//         <div className="latest-session">
//           <h2>Latest Session</h2>
//           <p><strong>Date:</strong> {sessions[sessions.length - 1].date}</p>
//           <p><strong>Exercise:</strong> {sessions[sessions.length - 1].exercise}</p>
//           <p><strong>Angle:</strong> {sessions[sessions.length - 1].angle}°</p>
//           <p><strong>Speed:</strong> {sessions[sessions.length - 1].speed} m/s</p>
//           <p><strong>Repetitions:</strong> {sessions[sessions.length - 1].repetitions}</p>
//         </div>
//       )}

//       {/* Progress Charts */}
//       <div className="charts">
//         <h2>Progress Over Time</h2>

//         {/* Angle Chart (Line Chart) */}
//         <div className="chart-container">
//           <h3>Angle Progress (Line Chart)</h3>
//           <Line data={{ labels, datasets: [{ label: "Angle (°)", data: angleData, borderColor: "blue", fill: false }] }} options={chartOptions} />
//         </div>

//         {/* Speed Chart (Line Chart) */}
//         <div className="chart-container">
//           <h3>Speed Progress (Line Chart)</h3>
//           <Line data={{ labels, datasets: [{ label: "Speed (m/s)", data: speedData, borderColor: "green", fill: false }] }} options={chartOptions} />
//         </div>

//         {/* Repetitions Progress (Donut Chart) */}
//         <div className="chart-container">
//           <h3>Repetitions Progress (Donut Chart)</h3>
//           <Pie data={donutData} options={chartOptions} />
//         </div>

//         {/* Angle Progress (Column Chart) */}
//         <div className="chart-container">
//           <h3>Angle Progress (Column Chart)</h3>
//           <Bar data={columnData} options={chartOptions} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PatientDashboard;
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { getSessions } from "../exercise-sessions/sessions-functions";
// import { Line, Pie } from "react-chartjs-2"; 
// import "chart.js/auto"; // Import chart.js for auto-configuration

// const PatientDashboard: React.FC = () => {
//   const { patientId } = useParams<{ patientId: string }>();
//   const [sessions, setSessions] = useState<any[]>([]);

//   useEffect(() => {
//     const fetchSessions = async () => {
//       if (patientId) {
//         const data = await getSessions(patientId);
//         setSessions(data);
//       }
//     };
//     fetchSessions();
//   }, [patientId]);

//   // Extract data for the charts
//   const labels = sessions.map((session) => session.date);
//   const angleData = sessions.map((session) => session.angle);
//   const speedData = sessions.map((session) => session.speed);
//   const repetitionData = sessions.map((session) => session.repetitions);

//   // Chart configurations
//   const chartOptions = {
//     responsive: true,
//     plugins: {
//       legend: { display: true },
//     },
//   };

//   // Pie Chart for Angle Progress
//   const anglePieData = {
//     labels: ['Angle Progress'],
//     datasets: [{
//       data: angleData,
//       backgroundColor: ['#FF5733', '#FF8C00', '#FFD700'],
//     }],
//   };

//   // Pie Chart for Repetitions Progress
//   const repetitionPieData = {
//     labels: ['Completed', 'Remaining'],
//     datasets: [{
//       data: [
//         sessions.length > 0 ? sessions[sessions.length - 1].repetitions : 0,
//         100 - (sessions.length > 0 ? sessions[sessions.length - 1].repetitions : 0)
//       ],
//       backgroundColor: ['#36A2EB', '#FF6384'],
//     }],
//   };

//   // Line Chart for Speed Progress
//   const speedLineData = {
//     labels,
//     datasets: [{
//       label: "Speed (m/s)",
//       data: speedData,
//       borderColor: 'green',
//       fill: false,
//       tension: 0.1, // Adds a smooth curve to the line chart
//     }],
//   };

//   return (
//     <div>
//       <h1>Patient Progress Dashboard</h1>

//       {/* Latest Session Summary */}
//       {sessions.length > 0 && (
//         <div className="latest-session">
//           <h2>Latest Session</h2>
//           <p><strong>Date:</strong> {sessions[sessions.length - 1].date}</p>
//           <p><strong>Exercise:</strong> {sessions[sessions.length - 1].exercise}</p>
//           <p><strong>Angle:</strong> {sessions[sessions.length - 1].angle}°</p>
//           <p><strong>Speed:</strong> {sessions[sessions.length - 1].speed} m/s</p>
//           <p><strong>Repetitions:</strong> {sessions[sessions.length - 1].repetitions}</p>
//         </div>
//       )}

//       {/* Progress Charts */}
//       <div className="charts">
//         <h2>Progress Over Time</h2>

//         {/* Speed Progress (Line Chart) */}
//         <div className="chart-container">
//           <h3>Speed Progress (Line Chart)</h3>
//           <Line data={speedLineData} options={chartOptions} />
//         </div>

//         {/* Angle Progress (Pie Chart) */}
//         <div className="chart-container">
//           <h3>Angle Progress (Pie Chart)</h3>
//           <Pie data={anglePieData} options={chartOptions} />
//         </div>

//         {/* Repetitions Progress (Pie Chart) */}
//         <div className="chart-container">
//           <h3>Repetitions Progress (Pie Chart)</h3>
//           <Pie data={repetitionPieData} options={chartOptions} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PatientDashboard;

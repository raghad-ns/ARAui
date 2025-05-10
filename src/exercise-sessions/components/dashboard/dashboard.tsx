import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2"; 
import "chart.js/auto"; // Import chart.js for auto-configuration
import './dashboard.css';

interface IProps {
  sessionId: string
}

const SessionDashboard = (props: IProps) => {
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
    <div className="sessionDetails">
      <h1>Patient Progress Dashboard</h1>

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
                data: angleData,
                borderColor: "green",
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

export default SessionDashboard;


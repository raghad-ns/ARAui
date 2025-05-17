import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2"; 
import "chart.js/auto"; // Import chart.js for auto-configuration
import './dashboard.css';
import { fetchRollData } from "../../sessions-functions";

interface IProps {
  sessionId: string
}

const SessionDashboard = (props: IProps) => {
  const [angleData, setAngleData] = useState<number[]>([]); // Initial angle values
  const [dataSize, setDataSize] = useState(50);
  const [labels, setLabels] = useState<string[]>(() => {
    const dates = []
    for (let i = 0; i < 50; i++) {
      const date = new Date();
      date.setDate(date.getDate() - (500 -i));
      dates.push(date.toISOString().split('T')[0]); // Format: YYYY-MM-DD
    }
    return dates
  }); // Initial date labels

  // Chart configurations
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: true },
    },
  };

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Running every 10 seconds", dataSize);
      setDataSize(prev => prev + 10)
      // 👇 Call your function here
    }, 10000); // 10 seconds = 10,000 ms

    return () => clearInterval(interval); // 🔄 Clean up on unmount
  }, []); // Empty dependency array = run once on mount

  useEffect(() => {
    console.log('size: ', dataSize)
    fetchRollData("123456", dataSize).then(rollData => {
      setAngleData(rollData)
    })
  }, [dataSize])


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


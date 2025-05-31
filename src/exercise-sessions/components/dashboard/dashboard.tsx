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
    const interval = setInterval(() => {
      fetchRollData("sHAHu4PVs5YHnnYD2QEa", 'roll').then(rollData => {
        setAngleData(rollData)
        console.log('roll data from dashboard: ', rollData)
      })
      fetchRollData("sHAHu4PVs5YHnnYD2QEa", 'patientActivity').then(patientActivity => {
        setPatientActivity(patientActivity)
      })
      fetchRollData("sHAHu4PVs5YHnnYD2QEa", 'time').then(time => {
        const startedAt = Number(time[0]);
        setLabels(time.map(sample => (Number(sample) - startedAt)))
      })
    }, 10); // 10 seconds = 10,000 ms

    return () => clearInterval(interval); // 🔄 Clean up on unmount
  }, []); // Empty dependency array = run once on mount

  useEffect(() => {
    fetchRollData("sHAHu4PVs5YHnnYD2QEa", 'roll').then(rollData => {
      setAngleData(rollData)
    })
    fetchRollData("sHAHu4PVs5YHnnYD2QEa", 'patientActivity').then(patientActivity => {
      setPatientActivity(patientActivity)
    })
    fetchRollData("sHAHu4PVs5YHnnYD2QEa", 'time').then(time => {
      const startedAt = Number(time[0]);
      setLabels(time.map(sample => (Number(sample) - startedAt)))
    })
  }, [])


  return (
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
  );
};

export default SessionDashboard;


import React, { useEffect, useState } from 'react';
import { getReports,addReport } from './reports-functions';

const Reports: React.FC = () => {
  const [reports, setReports] = useState<any[]>([]);

  useEffect(() => {
    const fetchReports = async () => {
      const patientId = "patient_id_example"; 
      const data = await getReports(patientId);
      setReports(data);
    };
    fetchReports();
  }, []);

  const handleAddReport = async () => {
    const patientId = "patient_id_example"; 
    const newReport = {
      sessionId: "session_id_example",  // Ideally, this should be dynamically selected or passed from session data
      date: "2023-02-21",
      patientId: "patient_id_example",
      therapistNotes: "Patient performed well, no issues observed",
      progress: "70% of the goal completed",
      recommendedAdjustments: "Increase session time by 5 minutes next time"
    };
    await addReport(patientId,newReport);  // Add new report to Firestore
  };

  return (
    <div>
      <h1>Reports</h1>
      <ul>
        {reports.map((report) => (
          <li key={report.id}>
            {report.date} - {report.patientId} - {report.therapistNotes}
          </li>
        ))}
      </ul>
      <button onClick={handleAddReport}>Add New Report</button>
    </div>
  );
};

export default Reports;

import React from 'react'
import PatientInfo from '../../components/patient-info/patient-info'
import SessionsTable from '../../../exercise-sessions/components/sessions-table/sessions-table'
import ScheduledSessions from '../../../exercise-sessions/pages/view-sessions/scheduled-sessions'

const SinglePatient = () => {
  return (
    <div>
        <PatientInfo/>
        <ScheduledSessions/>
    </div>
  )
}

export default SinglePatient
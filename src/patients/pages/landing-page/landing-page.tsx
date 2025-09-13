import React from 'react';
import './landing-page.css';

interface LandingPageProps {
  children: React.ReactNode;
}

const LandingPage: React.FC<LandingPageProps> = ({ children }) => {
  return (
    <div className="landingPage">
      <img
        className="backgroundImage"
        src="https://media.istockphoto.com/id/1152834631/photo/physical-therapists-are-checking-patients-elbows-at-the-clinic-office-room.jpg?s=612x612&w=0&k=20&c=erAKQEPWGdLCTdJTAM-74yC-Sf9NTYP8_cJI524Bwpo="
        alt="Background"
      />
      <div className="overlayContent">
        <div className="pageTop">
          <h1>Arm Rehabilitation Assistant</h1>
          <p>Empowering therapists to track patient recovery effectively</p>
        </div>
        <div className="mainContent">{children}</div>
      </div>
    </div>
  );
};

export default LandingPage;

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {signsData} from './SignData';
import '../PagesStyles/SignDetailsPage.css';

const SignDetailsPage = () => {
  const { signId } = useParams(); // Get the sign ID from the URL
  const navigate = useNavigate();

  // Find the sign based on the redirectLink (e.g., "/signs/peace-sign")
  const sign = signsData.signs.find((s) => s.redirectLink === `/signs/${signId}`);

  if (!sign) {
    return <div>Sign not found</div>;
  }

  return (
    <div className="sign-details-container">
        <button className="back-btn" onClick={() => navigate('/learn')}>
        Back
      </button>

    <div className='sign-details'>
    <h1 className="page-title">Sign Info</h1>
      <div className="sign-details-content">
        <div className="sign-image">
          <img src={sign.image} alt={sign.name} />
        </div>
        <div className="sign-description">
          <h2>{sign.name}</h2>
          <p>{sign.description}</p>
        </div>
      </div>
    </div>

    
    </div>
  );
};

export default SignDetailsPage;
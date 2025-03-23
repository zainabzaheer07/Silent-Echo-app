import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { signsData } from './SignData';
import styles from '../PagesStyles/SignDetailsPage.module.css';

const SignDetailsPage = () => {
  const { signId } = useParams();
  const navigate = useNavigate();

  // Find the sign based on the redirectLink (e.g., "/signs/peace-sign")
  const sign = signsData.signs.find((s) => s.redirectLink === `/signs/${signId}`);

  if (!sign) {
    return <div>Sign not found</div>;
  }

  return (
    <div className={styles.signDetailsContainer}>
      <button className={styles.backBtn} onClick={() => navigate('/learn')}>
        Back
      </button>

      <div className={styles.signDetails}>
        <h1 className={styles.pageTitle}>Sign Info</h1>
        <div className={styles.signDetailsContent}>
          <div className={styles.signImage}>
            <img src={sign.image} alt={sign.name} />
          </div>
          <div className={styles.signDescription}>
            <h2>{sign.name}</h2>
            <p>{sign.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignDetailsPage;

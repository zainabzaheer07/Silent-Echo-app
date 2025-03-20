import React, { useState } from "react";
import "../PagesStyles/LearnPage.css";
import { signsData } from "../pages/SignData";
import { NavLink } from "react-router-dom";

function LearnPage() {
  const [data, setData] = useState(signsData.signs);
  console.log(signsData);

  return (
    <div className="learn-page-container">
      <div className="learn-page-sign-data-container">
        {data.length > 0 ? (
          data.map((sign, index) => (
            <div key={index} className="learn-page-sign-data">
              <div className="learn-page-image-container">
                <img src={sign.image} alt={sign.alt} /> {/* Use sign.alt */}
                <NavLink to={sign.redirectLink}>
                  <button
                    className="learn-page-sign-button"
                    aria-label={`Learn more about ${sign.name}`}
                  >
                    Learn...
                  </button>
                </NavLink>
              </div>
            </div>
          ))
        ) : (
          <p>No signs available.</p>
        )}
      </div>
    </div>
  );
}

export default LearnPage;
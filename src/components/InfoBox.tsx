import React from 'react'

import '../styles/InfoBox.css'

const InfoBox:React.FC = () => {
    return (
        <div className="info-box">
      <h2 className="info-box-title">Super Licence Requirements</h2>
      <p className="info-box-text">
        To qualify for an FIA Super Licence, drivers must:
      </p>
      <ul className="info-box-list">
        <li>Be at least 18 years old</li>
        <li>Hold an International Grade A competition licence</li>
        <li>Accumulate at least 40 points over a 3-year period in eligible racing series</li>
        <li>Have completed at least 80% of two full seasons in eligible championships</li>
        <li>Have driven at least 300km in a Formula One car at race speeds</li>
      </ul>
      <p className="info-box-text">
        Points are awarded based on final championship positions in various FIA-approved series 
        including Formula 2, Formula 3, Formula 4, WEC, and IndyCar.
      </p>
    </div>
    )
}

export default InfoBox
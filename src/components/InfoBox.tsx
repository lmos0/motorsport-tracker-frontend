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
        <li>The results from a maximum of 2 championships
            can be accumulated from a single calendar year,
            provided that the start date of the second
            championship falls after the end date of the first
            championship during the year in question</li>
      </ul>
      <p className="info-box-text">  
      </p>
    </div>
    )
}

export default InfoBox
import React from "react";
import { Driver } from "../utils/types";
import { getCategoryColor, getLicenseStatus, getCountryFlag } from "../utils/utils";

import '../styles/DriverCard.css'


interface DriverCardPropos {
    driver: Driver}

const DriverCard: React.FC<DriverCardPropos> = ({driver}) => {
    const licenseStatus = getLicenseStatus(driver.points)
    const categoryColor = getCategoryColor(driver.category)

    return (
        <div className="driver-card">
      <div className={`driver-card-header ${categoryColor}`}></div>
      <div className="driver-card-content">
        <div className="driver-card-top">
          <img src={driver.photoUrl} alt={driver.name} className="driver-photo" />
          <div className="driver-details">
            <h3 className="driver-name">{driver.name}</h3>
            <span className={`driver-category ${categoryColor}`}>
              {driver.category}
            </span>
          </div>
          <div className="driver-points">
            <div className="driver-points-value">{driver.points}</div>
            <div className="driver-points-label">POINTS</div>
          </div>
        </div>

        
        
        <div className="driver-metadata">
        <input type="hidden" value={driver._id} />
       

          <div className="team-info">
            <div className="info-label">Development Program </div>
            <div className="info-value">{driver.developmentProgram}</div>
          </div>
          <div className="country-info">
            <div className="info-label">Nationality</div>
            <div className="info-value">{driver.nationality} <span className="country-flag">{getCountryFlag(driver.nationality)}</span></div>
          </div>
        </div>
        
        <div className={`license-status ${licenseStatus.color}`}>
          {licenseStatus.text} for Super Licence
        </div>
      </div>        
    </div>
  );
};

export default DriverCard;
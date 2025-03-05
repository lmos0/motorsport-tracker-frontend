import React, {useState} from "react";
import { Driver, DriverResult } from "../utils/types";
import { getCategoryColor, getLicenseStatus, getCountryFlag } from "../utils/utils";

import axios from "axios";

import '../styles/DriverCard.css'


interface DriverCardPropos {
    driver: Driver}

const DriverCard: React.FC<DriverCardPropos> = ({driver}) => {

  const [isResultsModalOpen, setIsResultsModalOpen] = useState(false);
  const [driverResults, setDriverResults] = useState<DriverResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

    const licenseStatus = getLicenseStatus(driver.points)
    const categoryColor = getCategoryColor(driver.category)

    const calculateAge = () => {

      if(!driver.dob) return 'N/A'

        const dob = new Date(driver.dob)
        const diff_ms = Date.now() - dob.getTime()
        const age_dt = new Date(diff_ms)
        return Math.abs(age_dt.getUTCFullYear
        () - 1970)

    }

    const driverAge = calculateAge()

    const fetchDriverResults = async () => {
      setIsLoading(true);
      setError(null);
      try {
        //const response = await axios.get(`http://localhost:3000/api/results/${driver._id}/results`);
        const response = await axios.get(`https://motorsport-tracker.onrender.com/api/results/${driver._id}/results`);
        
        // Safe access to results
        const results = response.data?.results || response.data || [];
       
        
        
        setDriverResults(Array.isArray(results) ? results : []);
        setIsResultsModalOpen(true);
      } catch (err) {
        console.error('Error fetching driver results:', err);
        setError(
          err instanceof Error 
            ? err.message 
            : 'Failed to fetch driver results'
        );
        setDriverResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    return (
        <div 
        className="driver-card"
        onClick={fetchDriverResults}
        style={{ cursor: 'pointer' }}
      >
          
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


        <div className="age-info">
                <div className="info-label">Age</div>
                <div className="info-value">{driverAge}</div>
              </div>
       

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
      {isResultsModalOpen && (
        <div className="results-modal-overlay" onClick={() => setIsResultsModalOpen(false)}>
          <div 
            className="results-modal-content" 
            onClick={(e) => e.stopPropagation()}
          >
            <div className="results-modal-header">
              <h2>{driver.name} - Career Results</h2>
              <button 
                className="results-modal-close"
                onClick={() => setIsResultsModalOpen(false)}
              >
                &times;
              </button>
            </div>
            
            <div className="results-modal-body">
              {isLoading ? (
                <div className="results-loading">Loading results...</div>
              ) : error ? (
                <div className="results-error">{error}</div>
              ) : driverResults.length === 0 ? (
                <div className="results-empty">No results found for this driver</div>
              ) : (
                <div className="results-list">
                  {driverResults.map((result) => (
                    <div key={result._id} className="results-item">
                      <div className="results-championship">
                        <span>Championship:</span> 
                        {result.championshipId?.name || 'Unknown'}
                      </div>
                      <div className="results-year">
                        <span>Year:</span> <p>{result.year}</p> 
                      </div>
                      <div className="results-position">
                        <span>Position:</span> <p className="results-position">{result.finalPosition}</p> 
                      </div>
                      <div className="results-points">
                        <span>Points</span> <p>{result.pointsEarned}</p> 
                      </div>

                    </div>
                  ))}
                  <div className="points-info-tooltip-content"><p>Points beyond 40 are not included in the final calculation</p></div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DriverCard;
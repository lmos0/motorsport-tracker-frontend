import React from 'react'
import { Driver } from '../utils/types'
import { getCategoryColor, getLicenseStatus, getCountryFlag } from '../utils/utils'

import '../styles/DriverTable.css'

interface DriverTableProps {
    drivers: Driver[]
}

const DriverTable: React.FC<DriverTableProps> = ({drivers}) => {
    
    return(
        <div className="driver-table-container">
      <div className="driver-table-scroll">
        <table className="driver-table">
          <thead>
            <tr className="driver-table-header">
              <th className="driver-table-cell">Driver</th>
              <th className="driver-table-cell">Category</th>
              <th className="driver-table-cell">Development Program</th>
              <th className="driver-table-cell">Country</th>
              <th className="driver-table-cell points-cell">Points</th>
              <th className="driver-table-cell status-cell">Status</th>
            </tr>
          </thead>
          <tbody>
            {drivers.map((driver, index) => {
              const licenseStatus = getLicenseStatus(driver.points);
              const categoryColor = getCategoryColor(driver.category);
              return (
                <tr key={driver._id} className={index % 2 === 0 ? 'driver-row-even' : 'driver-row-odd'}>
                  <td className="driver-table-cell">
                    <div className="driver-info">
                      <img src={driver.photoUrl} alt={driver.name} className="driver-table-photo" />
                      <span className="driver-table-name">{driver.name}</span>
                    </div>
                  </td>
                  <td className="driver-table-cell">
                    <span className={`category-badge ${categoryColor}`}>
                      {driver.category}
                    </span>
                  </td>
                  
                  <td className="driver-table-cell">{driver.developmentProgram}</td>
                  <td className="driver-table-cell">{driver.nationality} <span className="country-flag">{getCountryFlag(driver.nationality)}</span></td>
                  <td className="driver-table-cell points-cell">{driver.points}</td>
                  <td className="driver-table-cell">
                    <span className={`status-badge ${licenseStatus.color}`}>
                      {licenseStatus.text}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>

    )

}

export default DriverTable
import '../styles/Header.css'
import React from 'react'
//todo fazer css

const Header: React.FC = () => {
    return(
        <div className="header">
        <div className="checkered-pattern"></div>
        <div className="header-content">
          <h1 className="header-title">SUPER LICENCE TRACKER</h1>
          <p className="header-subtitle">Monitoring the future stars of motorsport</p>
        </div>
      </div>
    )
}

export default Header
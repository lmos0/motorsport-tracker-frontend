import '../styles/Header.css';
import React from 'react';

const Header: React.FC = () => {
    return(
        <div className="header">
            <div className="racing-stripe"></div>
            <div className="header-glare"></div>
            <div className="header-content">
                <div className="title-container">
                  <a href="https://superlicencetracker.com"><h1 className="header-title">
                        <span className="title-part">SUPER</span>
                        <span className="title-part">LICENCE</span>
                        <span className="title-accent">TRACKER</span>
                    </h1></a>  
                    <div className="title-line"></div>
                </div>
                <p className="header-subtitle">
                    <span className="subtitle-text">PADDOCK TO PODIUM: MONITORING MOTORSPORT'S EMERGING TALENT</span>
                    <span className="subtitle-line"></span>
                </p>
            </div>
        </div>
    )
}

export default Header;
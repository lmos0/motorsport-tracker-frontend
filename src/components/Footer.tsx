import '../styles/Footer.css';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate()

  const handleContactClick = () => {
    navigate('/report');
  };
  
  return (
    <footer className="footer">
  <div className="footer-container">
    <div className="footer-section">
      <h3 className="footer-title">Super licence Tracker</h3>
      <p className="footer-description">
      Keep track of a driver's journey to earning an F1 Super Licence by following their progress across different racing series!
      </p>
    </div>

    <div className="footer-section">
      <h3 className="footer-title">Resources</h3>
      <ul className="footer-list">
        <li><a href="https://www.fia.com/sites/default/files/documents/appendix_l_2025_publie_le_26_fevrier_2025_0.pdf">Super Licence Points Regulation</a></li>
      </ul>
    </div>
  </div>

  <div className="footer-bottom">
    <p>{currentYear} Super Licence Tracker. Open-source under the <a className='mit' href="https://opensource.org/licenses/MIT" target="_blank" rel="noopener noreferrer">MIT License</a>.</p>
    <div className="footer-links">
     <p>Created by <a href="https://github.com/lmos0" target="_blank" rel="noopener noreferrer">lmos0</a></p> 
     <button onClick={handleContactClick} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', textDecoration: 'underline', padding: 0, font: 'inherit' }}>Contact</button>
    </div>
  </div>
</footer>

  );
};

export default Footer;


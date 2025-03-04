import '../styles/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
  <div className="footer-container">
    <div className="footer-section">
      <h3 className="footer-title">FIA Super License Tracker</h3>
      <p className="footer-description">
        Track driver progress towards Formula 1 super license eligibility across multiple racing categories.
      </p>
    </div>

    <div className="footer-section">
      <h3 className="footer-title">Resources</h3>
      <ul className="footer-list">
        <li><a href="#">Super License Points System</a></li>
        <li><a href="#">FIA Racing Ladder</a></li>
        <li><a href="#">Development Programs</a></li>
        <li><a href="#">Race Calendar</a></li>
      </ul>
    </div>
  </div>

  <div className="footer-bottom">
    <p>{currentYear} FIA Super License Tracker. Open-source under the <a className='mit' href="https://opensource.org/licenses/MIT" target="_blank" rel="noopener noreferrer">MIT License</a>.</p>
    <div className="footer-links">
     <p>Created by <a href="https://github.com/lmos0" target="_blank" rel="noopener noreferrer">lmos0</a></p> 
      <a href="#">Contact</a>
    </div>
  </div>
</footer>

  );
};

export default Footer;
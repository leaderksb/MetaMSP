import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function AdminNav() {
  const [showSubNav, setShowSubNav] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;

    if (
      path.includes('/admin/answer') ||
      path.includes('/admin/question')
    ) {
      setShowSubNav(true);
    } else {
      setShowSubNav(false);
    }
  }, [location]);

  const handleNavClick = (event) => {
    document.querySelectorAll('.nav-link').forEach((link) => {
      link.classList.remove('active');
    });
    event.target.classList.add('active');
  };

  const handleAnswerLinkClick = () => {
    setShowSubNav(!showSubNav);
  };

  return (
    <nav className="navbar navbar-expand-xl justify-content-center" style={{ width: '350px', height: '50px', marginBottom: '7px', marginLeft: 'auto', marginRight: 'auto' }}>
      <div className="navbar-nav">
        <Link to="/admin/notice" className="nav-link" onClick={handleNavClick} style={{ width: '85px' }}>Notice</Link>
        <button className="nav-link" onClick={handleAnswerLinkClick} style={{ width: '85px' }}>Answer</button>
        <button className="nav-link" onClick={handleNavClick} style={{ width: '85px' }} disabled>Chat</button>
        <button className="nav-link" onClick={handleNavClick} style={{ width: '85px' }} disabled>Report</button>
      </div>
      {showSubNav && (
        <div id="sub-nav">
          <nav className="navbar navbar-expand-xl justify-content-center" style={{ width: '350px', height: '50px', marginLeft: 'auto', marginRight: 'auto' }}>
            <div className="navbar-nav">
              <Link to="/admin/question/service/list" className="nav-link" onClick={handleNavClick} style={{ width: '114px' }}>Service</Link>
              <button className="nav-link" onClick={handleNavClick} style={{ width: '114px' }} disabled>Emergency</button>
              <button className="nav-link" onClick={handleNavClick} style={{ width: '112px' }} disabled>List</button>
            </div>
          </nav>
        </div>
      )}
    </nav>
  );
}

export default AdminNav;

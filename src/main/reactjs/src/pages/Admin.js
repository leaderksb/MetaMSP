import React, { useState } from 'react';
import AdminNotice from './AdminNotice.js';
import AdminQuestionServiceList from './AdminQuestionServiceList.js';

function Admin() {
  const [showMiddleNav, setShowMiddleNav] = useState(false);
  const [showAdminNotice, setAdminNotice] = useState(false);
  const [showAdminQuestionServiceList, setAdminQuestionServiceList] = useState(false);

  const [activeTopNav, setActiveTopNav] = useState('');
  const [activeMiddleNav, setActiveMiddleNav] = useState('');

  const handleTopNavClick = (e) => {
    const clickedButton = e.target.textContent;
    if (clickedButton === 'Notice') {
      setShowMiddleNav(false);
      setAdminNotice(true);
      setAdminQuestionServiceList(false);
    } else if (clickedButton === 'Answer') {
      setShowMiddleNav(!showMiddleNav);
    }
    setActiveTopNav(clickedButton);
  };

  const handleMiddleNavClick = (e) => {
    const clickedButton = e.target.textContent;
    if (clickedButton === 'Service') {
      setAdminNotice(false);
      setAdminQuestionServiceList(true);
    }
    setActiveMiddleNav(clickedButton);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-xl justify-content-center" style={{ width: '350px', height: '50px', marginBottom: '7px', marginLeft: 'auto', marginRight: 'auto' }}>
        <div className="top-nav">
          <button className={`top-btn-link ${activeTopNav === 'Notice' ? 'active' : ''}`} onClick={handleTopNavClick} style={{ width: '85px' }}>Notice</button>
          <button className={`top-btn-link ${activeTopNav === 'Answer' ? 'active' : ''}`} onClick={handleTopNavClick} style={{ width: '85px' }}>Answer</button>
          <button className={`top-btn-link ${activeTopNav === 'Chat' ? 'active' : ''}`} onClick={handleTopNavClick} style={{ width: '85px' }} disabled>Chat</button>
          <button className={`top-btn-link ${activeTopNav === 'Report' ? 'active' : ''}`} onClick={handleTopNavClick} style={{ width: '85px' }} disabled>Report</button>
        </div>
      </nav>
      <nav>
        {showMiddleNav && (
          <div id="middle-nav">
            <nav className="navbar navbar-expand-xl justify-content-center" style={{ width: '350px', height: '50px', marginLeft: 'auto', marginRight: 'auto' }}>
              <div className="navbar-nav">
                <button className={`middle-btn-link ${activeMiddleNav === 'Service' ? 'active' : ''}`} onClick={handleMiddleNavClick} style={{ width: '105px' }}>Service</button>
                <button className={`middle-btn-link ${activeMiddleNav === 'Emergency' ? 'active' : ''}`} onClick={handleMiddleNavClick} style={{ width: '130px' }} disabled>Emergency</button>
                <button className={`middle-btn-link ${activeMiddleNav === 'List' ? 'active' : ''}`} onClick={handleMiddleNavClick} style={{ width: '105px' }}>List</button>
              </div>
            </nav>
          </div>
        )}
      </nav>
      <div>
      {showAdminNotice && (
        <AdminNotice/>
      )}
      </div>
      <div>
      {showAdminQuestionServiceList && (
        <AdminQuestionServiceList showAdminQuestionServiceList={showAdminQuestionServiceList} setAdminQuestionServiceList={setAdminQuestionServiceList} />
      )}
      </div>

    </div>
  );
}

export default Admin;

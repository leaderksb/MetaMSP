import React, { useState } from 'react';
import UserNotice from './UserNotice.js';
import UserQuestionServiceFirst from './UserQuestionServiceFirst.js';
import UserQuestionServiceList from './UserQuestionServiceList.js';

function User() {
  const [showMiddleNav, setShowMiddleNav] = useState(false);
  const [showUserNotice, setUserNotice] = useState(false);
  const [showUserQuestionServiceFirst, setUserQuestionServiceFirst] = useState(false);
  const [showUserQuestionServiceList, setUserQuestionServiceList] = useState(false);

  const [activeTopNav, setActiveTopNav] = useState('');
  const [activeMiddleNav, setActiveMiddleNav] = useState('');

  const handleTopNavClick = (e) => {
    const clickedButton = e.target.textContent;
    if (clickedButton === 'Notice') {
      setShowMiddleNav(false);
      setUserNotice(true);
      setUserQuestionServiceFirst(false);
      setUserQuestionServiceList(false);
    } else if (clickedButton === 'Question') {
      setShowMiddleNav(!showMiddleNav);
    }
    setActiveTopNav(clickedButton);
  };

  const handleMiddleNavClick = (e) => {
    const clickedButton = e.target.textContent;
    if (clickedButton === 'Service') {
      setUserNotice(false);
      setUserQuestionServiceFirst(true);
      setUserQuestionServiceList(false)
    } else if (clickedButton === 'List') {
      setUserNotice(false);
      setUserQuestionServiceFirst(false);
      setUserQuestionServiceList(true);
    }
    setActiveMiddleNav(clickedButton);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-xl justify-content-center" style={{ width: '350px', height: '50px', marginBottom: '7px', marginLeft: 'auto', marginRight: 'auto' }}>
        <div className="top-nav">
          <button className={`top-btn-link ${activeTopNav === 'Notice' ? 'active' : ''}`} onClick={handleTopNavClick} style={{ width: '85px' }}>Notice</button>
          <button className={`top-btn-link ${activeTopNav === 'Question' ? 'active' : ''}`} onClick={handleTopNavClick} style={{ width: '85px' }}>Question</button>
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
      {showUserNotice && (
        <UserNotice/>
      )}
      </div>
      <div>
      {showUserQuestionServiceFirst && (
        <UserQuestionServiceFirst/>
      )}
      </div>
      <div>
      {showUserQuestionServiceList && (
        <UserQuestionServiceList showUserQuestionServiceList={showUserQuestionServiceList} setUserQuestionServiceList={setUserQuestionServiceList} />
      )}
      </div>

    </div>
  );
}

export default User;

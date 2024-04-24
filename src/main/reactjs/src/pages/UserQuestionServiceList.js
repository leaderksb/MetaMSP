import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserQuestionServiceSelect from './UserQuestionServiceSelect.js';

const UserQuestionServiceList = ({ showUserQuestionServiceList, setUserQuestionServiceList }) => {
  const [questionServiceList, setQuestionServiceList] = useState([]);
  const [showQuestionServiceSelect, setQuestionServiceSelect] = useState(false);
  const [qurl, setQurl] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/user/question/service/list');
        setQuestionServiceList(response.data);
      } catch (error) {
        console.error('Error fetching question service list:', error);
      }
    };

    fetchData();
  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때만 실행되도록 함

  const handleLinkClick = async (qurl) => {
    try {
      const response = await axios.get(`/api/user/question/service/${qurl}`);
      setQuestionServiceSelect(true);
      setQurl(qurl);
    } catch (error) {
      console.error('Error fetching question service:', error);
    }
  };

  return (
    <div>
      {showUserQuestionServiceList && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ marginTop: '12px' }}>
            <table style={{ width: '100%' }}>
              <thead>
                <tr>
                  <th style={{ width: '30%' }}>Category</th>
                  <th style={{ width: '30%' }}>Title</th>
                  <th style={{ width: '40%' }}>Date</th>
                </tr>
              </thead>
              <tbody>
                {questionServiceList.map((questionService, index) => (
                  <tr key={index}>
                    <td>{questionService.qcategory}</td>
                    <td>
                      <button className="button-link" onClick={() => handleLinkClick(questionService.qurl)}>
                        {questionService.qurl}
                      </button>
                    </td>
                    <td>{new Date(questionService.q_date).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showQuestionServiceSelect && (
        <div>
          <UserQuestionServiceSelect qurl={qurl}/>
        </div>
      )}
    </div>
  );
};

export default UserQuestionServiceList;

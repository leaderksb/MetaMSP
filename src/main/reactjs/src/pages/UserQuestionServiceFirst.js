import React, { useState } from 'react';
import axios from 'axios';

function UserQuestionServiceFirst() {
  const [formData, setFormData] = useState({
    qcategory: 'compute',
    q_title: '',
    q_content: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/user/question/service/first', formData);
      if (response.data === 'UserQuestionServiceList') {
        alert('첫 문의를 등록하였습니다.');
        // 폼 데이터 초기화
        setFormData({
          qcategory: '',
          q_title: '',
          q_content: ''
        });
      } else {
        alert('문의 등록에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error submitting question:', error);
      alert('문의 등록에 실패했습니다.');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <form onSubmit={handleSubmit} style={{ marginTop: '12px' }}>
        <div>
        <h5>Question</h5>
          <label htmlFor="qcategory">Category </label>
          <select id="qcategory" name="qcategory" style={{ width: '280px' }} value={formData.qcategory} onChange={handleChange}>
            <option value="compute">Compute</option>
            <option value="storage">Storage</option>
            <option value="containers">Containers</option>
            <option value="database">Database</option>
            <option value="security">Security</option>
            <option value="management">Management</option>
            <option value="ai">AI</option>
            <option value="application">Application</option>
            <option value="api">API</option>
            <option value="internet">Internet</option>
            <option value="blockchain">Blockchain</option>
            <option value="migration">Migration</option>
            <option value="etc">ETC</option>
          </select>
        </div>
        <hr />
        <div>
          <label htmlFor="q_title">Title </label>
          <input type="text" id="q_title" name="q_title" maxLength="100" style={{ width: '316px' }} value={formData.q_title} onChange={handleChange} />
        </div>
        <hr />
        <div>
          <label htmlFor="q_content">Content </label>
          <br />
          <textarea id="q_content" name="q_content" style={{ width: '351px', height: '300px' }} value={formData.q_content} onChange={handleChange}></textarea>
        </div>
        <hr />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button type="submit" className="btn btn-primary">문의하기</button>
        </div>
      </form>
    </div>
  );
}

export default UserQuestionServiceFirst;

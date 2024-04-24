import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserQuestionServiceSelect = ({ qurl }) => {
  const [questionService, setQuestionService] = useState(null);
  const [qnaList, setQnaList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/user/question/service/${qurl}`);
        setQuestionService(response.data.questionService);
        setQnaList(response.data.qnaList);
      } catch (error) {
        console.error('Error fetching question service:', error);
      }
    };

    fetchData();
  }, [qurl]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataWithInputs = {
      qcategory: questionService.qcategory,
      qprt: questionService.qurl,
      q_title: e.target.q_title_add.value,
      q_content: e.target.q_content_add.value
    };

    try {
      const response = await axios.post('/api/user/question/service/add', formDataWithInputs);
      alert(response.data);
      if (response.data === 'UserQuestionServiceList') {
        alert('추가 문의를 등록하였습니다.');
        // 폼 데이터 초기화
        e.target.q_title_add.value = '';
        e.target.q_content_add.value = '';
      } else {
        alert('추가 문의 등록에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error submitting question:', error);
      alert('추가 문의 등록에 실패했습니다.');
    }
  };

  return (
    <>
      {/* 첫 번째 문의 */}
      {questionService && (
        <div style={{ width: '50%', margin: '19px auto' }}>
          <table style={{ width: '100%', textAlign: 'center', borderCollapse: 'collapse' }}>
            <colgroup>
              <col style={{ width: '30%' }} />
              <col style={{ width: '70%' }} />
            </colgroup>
            <tbody>
              <h5>Question</h5>
              <tr>
                <td style={{ borderLeft: 'none', verticalAlign: 'middle', fontWeight: 'bold' }}>
                  <label htmlFor="q_title">Title </label>
                </td>
                <td style={{ borderRight: 'none', verticalAlign: 'middle' }}>
                  <span id="q_title_first" name="q_title" style={{ textAlign: 'center', display: 'block' }}>{questionService.qnATitle}</span>
                </td>
              </tr>
              <tr>
                <td colSpan="2" style={{ borderLeft: 'none', borderRight: 'none', verticalAlign: 'middle', fontWeight: 'bold' }}>
                  <label htmlFor="q_content">Content</label>
                </td>
              </tr>
              <tr>
                <td colSpan="2" style={{ borderLeft: 'none', borderRight: 'none', verticalAlign: 'middle' }}>
                  <p id="q_content_first" name="q_content">{questionService.qnAContent}</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* 추가된 문의 및 답변 */}
      <div style={{ width: '50%', margin: '19px auto' }}>
        <table style={{ width: '100%', textAlign: 'center', borderCollapse: 'collapse' }}>
          <colgroup>
            <col style={{ width: '30%' }} />
            <col style={{ width: '70%' }} />
          </colgroup>
          <tbody>
            {qnaList.map((item, index) => (
              <React.Fragment key={index}>
                <h5>{item.property}</h5>
                <tr>
                  <td style={{ borderLeft: 'none', verticalAlign: 'middle', fontWeight: 'bold' }}>
                    <label htmlFor="q_title">Title </label>
                  </td>
                  <td style={{ borderRight: 'none', verticalAlign: 'middle' }}>
                    <span id="q_title_first" name="q_title" style={{ textAlign: 'center', display: 'block' }}>{item.title}</span>
                  </td>
                </tr>
                <tr>
                  <td colSpan="2" style={{ borderLeft: 'none', borderRight: 'none', verticalAlign: 'middle', fontWeight: 'bold' }}>
                    <label htmlFor="q_content">Content</label>
                  </td>
                </tr>
                <tr>
                  <td colSpan="2" style={{ borderLeft: 'none', borderRight: 'none', verticalAlign: 'middle' }}>
                    <p id="q_content_first" name="q_content">{item.content}</p>
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* 추가 문의 */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <h5>Question Add</h5>
        <form onSubmit={handleSubmit}>
          {questionService && (
            <>
              <input type="hidden" id="q_category_add" name="q_category_add" value={questionService.qcategory} />
              <input type="hidden" id="qPrt" name="qPrt" value={questionService.qurl} />
            </>
          )}
          <div>
            <label htmlFor="q_title_add">Title </label>
            <input type="text" id="q_title_add" name="q_title_add" maxLength="100" style={{ width: '316px' }} />
          </div>
          <hr />
          <div>
            <label htmlFor="q_content_add">Content </label>
            <br />
            <textarea id="q_content_add" name="q_content_add" style={{ width: '351px', height: '300px' }}></textarea>
          </div>
          <hr />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button type="submit" value="submit" className="btn btn-primary">추가 문의하기</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default UserQuestionServiceSelect;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [isCompany, setIsCompany] = useState(false);
  const [company, setCompany] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [phone, setPhone] = useState('');
  const [consent, setConsent] = useState('');

  const navigate = useNavigate(); // useNavigate 훅 사용

  const formData = {
    company,
    name,
    email,
    id,
    pw,
    phone,
    consent
  };

  const handleCompanyChange = (e) => {
    setIsCompany(e.target.value === 'Yes');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (consent === 'No') {
      alert('개인정보 미동의 시 가입이 불가합니다.');
    } else {
      alert('가입이 완료 되었습니다.');

      axios.post('/api/signup', formData)
        .then(response => {
          console.log('Form data submitted successfully:', response.data);
          navigate('/login'); // 로그인 페이지로 이동
        })
        .catch(error => {
          console.error('Error submitting form data:', error);
        });
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <h2 className="text-center">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Company</label><br />
              <input type="radio" id="company-yes" name="company-radio" value="Yes" onChange={handleCompanyChange} required />
              <label htmlFor="company-yes">Yes</label>
              <input type="radio" id="company-no" name="company-radio" value="No" onChange={handleCompanyChange} required />
              <label htmlFor="company-no">No</label><br />
              {isCompany && (
                <input type="text" id="company-input" name="company" className="form-control" placeholder="Company Name" value={company} onChange={(e) => setCompany(e.target.value)} />
              )}
            </div>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="id">ID</label>
              <input type="text" id="id" name="id" className="form-control" value={id} onChange={(e) => setId(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="pw">Password</label>
              <input type="password" id="pw" name="pw" className="form-control" value={pw} onChange={(e) => setPw(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input type="tel" id="phone" name="phone" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Consent</label><br />
              <input type="radio" id="consent-yes" name="consent" value="Yes" onChange={(e) => setConsent(e.target.value)} required />
              <label htmlFor="consent-yes">Yes</label>
              <input type="radio" id="consent-no" name="consent" value="No" onChange={(e) => setConsent(e.target.value)} required />
              <label htmlFor="consent-no">No</label>
            </div>
            <div className="form-group mt-2">
              <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

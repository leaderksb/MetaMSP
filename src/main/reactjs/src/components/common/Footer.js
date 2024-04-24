import React from 'react';

const Footer = () => {
  return (
    <footer className="footer" style={{ marginTop: '400px' }}>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h12>MetaMSP</h12>
            <p>우리는 IT 솔루션을 제공하며 고객의 성공을 우선시하는 회사입니다.</p>
          </div>
          <div className="col-md-6">
            <h12>연락처</h12>
            <p>인천광역시 남동구 XXX로 YY번길 <br /> Tel: 032-0000-0000 <br /> Email: contact@metamsp.com</p>
          </div>
        </div>
        <div className="row">
          <div className="col-12 text-center">
            <p>© 2024 MetaMSP. 모든 권리 보유.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

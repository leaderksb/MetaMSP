import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthProvider';

function Login() {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Security 처리를 위해 Parameter로 전달
    const params = new URLSearchParams();
    params.append('id', id);
    params.append('pw', pw);

    const url = `/login?${params.toString()}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      if (response.ok) {
          if (response.url.includes('admin')) {
            const isAdmin = 'admin';
            login(isAdmin);
            // 현재 페이지를 새 페이지로 교체
            // 뒤로가기 불가
            window.location.replace = 'http://localhost:8080/admin';
          } else if (response.url.includes('user')) {
            const isUser = 'user';
            login(isUser);
            window.location.replace = 'http://localhost:8080/user';
          } else {
            setError('해당 사용자가 존재하지 않습니다.');
          }
        } else if (response.status === 401) {
          setError('인증 오류가 발생했습니다.');
        } else {
          setError('서버 오류가 발생했습니다.');
        }
      } catch (error) {
        setError('서버에 연결할 수 없습니다.');
      }
    };

  return (
    <div className="init">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <h2 className="text-center">Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="id">ID</label>
                <input type="text" id="id" name="id" className="form-control" required value={id} onChange={(e) => setId(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="pw">Password</label>
                <input type="password" id="pw" name="pw" className="form-control" required value={pw} onChange={(e) => setPw(e.target.value)} />
              </div>
              <div className="form-group mt-2">
                <button type="submit" className="btn btn-primary btn-block">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
}

export default Login;

import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

  export const AuthContext = createContext();

  const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const navigate = useNavigate();

  // 로컬 스토리지에서 상태를 가져오기 위한 효과
  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
    const storedIsAdmin = localStorage.getItem('isAdmin');
    const storedIsUser = localStorage.getItem('isUser');

    if (storedIsLoggedIn) {
      setIsLoggedIn(JSON.parse(storedIsLoggedIn));
    }
    if (storedIsAdmin) {
      setIsAdmin(JSON.parse(storedIsAdmin));
    }
    if (storedIsUser) {
      setIsUser(JSON.parse(storedIsUser));
    }

    // 이미 로그인된 경우 리다이렉션 처리
    if (isLoggedIn) {
      if (isAdmin) {
        navigate('/admin');
      } else if (isUser) {
        navigate('/user');
      }
    }
  }, [navigate, isLoggedIn, isAdmin, isUser]);

  // 로그인 시 상태 업데이트 및 로컬 스토리지에 저장
  const login = (isAdminUser) => {
    setIsLoggedIn(true);
    if (isAdminUser === 'admin') {
      setIsAdmin(true);
      setIsUser(false);
      localStorage.setItem('isAdmin', JSON.stringify(true));
      localStorage.setItem('isUser', JSON.stringify(false));
    } else if (isAdminUser === 'user') {
      setIsAdmin(false);
      setIsUser(true);
      localStorage.setItem('isAdmin', JSON.stringify(false));
      localStorage.setItem('isUser', JSON.stringify(true));
    }
    localStorage.setItem('isLoggedIn', JSON.stringify(true));
  };

  // 로그아웃 시 상태 초기화 및 로컬 스토리지에서 제거
  const logout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setIsUser(false);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('isUser');

    // 스프링 시큐리티에 로그아웃 요청 보내기
    fetch('http://localhost:10000/logout', {
      method: 'GET',
      credentials: 'include' // 쿠키를 포함하여 요청 보내기 위해 credentials 설정
    })
      .then(response => {
        // 로그아웃 처리 완료
        console.log('로그아웃 요청 성공');
      })
      .catch(error => {
        console.error('로그아웃 요청 실패:', error);
      });

    // 로그아웃 시 로그인 페이지로 리다이렉션
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, isAdmin, isUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

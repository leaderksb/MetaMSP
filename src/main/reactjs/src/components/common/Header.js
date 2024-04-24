// Header.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider'; // AuthContext 임포트

function Header() {
  const { isLoggedIn, logout } = useContext(AuthContext); // AuthContext에서 상태 및 함수 가져오기

  const handleLogout = () => {
    logout(); // 로그아웃 함수 호출
  };

  return (
    <header>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingLeft: '30px' }}>
        <div>
          <Link to="/">
            <img src="/logo.png" alt="Logo" style={{ position: 'relative', top: 0, left: 0 }} />
          </Link>
        </div>
        <div>
          {isLoggedIn ? (
            <>
              <Link to="/" style={{ fontSize: 'large', marginRight: '50px' }} onClick={handleLogout}>로그아웃</Link>
            </>
          ) : (
            <>
              <Link to="/login" style={{ fontSize: 'large', marginRight: '50px' }}>로그인</Link>
              <Link to="/signup" style={{ fontSize: 'larger', marginRight: '50px' }}>회원가입</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;

//import React, { useContext } from 'react';
//import { Link } from 'react-router-dom';
//import { AuthContext } from '../../contexts/AuthProvider'; // AuthContext 임포트
//import AdminNav from './AdminNav';
//import UserNav from './UserNav';
//
//function Header() {
//  const { isLoggedIn, logout, isAdmin, isUser } = useContext(AuthContext); // AuthContext에서 상태 및 함수 가져오기
//
//  const handleLogout = () => {
//    logout(); // 로그아웃 함수 호출
//  };
//
//  return (
//    <header>
//      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingLeft: '30px' }}>
//        <div>
//          <Link to="/">
//            <img src="/logo.png" alt="Logo" style={{ position: 'relative', top: 0, left: 0 }} />
//          </Link>
//        </div>
//        <div>
//          {isLoggedIn ? (
//            <>
//              <Link to="/" style={{ fontSize: 'large', marginRight: '50px' }} onClick={handleLogout}>로그아웃</Link>
//            </>
//          ) : (
//            <>
//              <Link to="/login" style={{ fontSize: 'large', marginRight: '50px' }}>로그인</Link>
//              <Link to="/signup" style={{ fontSize: 'larger', marginRight: '50px' }}>회원가입</Link>
//            </>
//          )}
//        </div>
//      </div>
//      {isAdmin && (
//        <AdminNav />
//      )}
//      {isUser && (
//        <UserNav />
//      )}
//    </header>
//  );
//}
//
//export default Header;

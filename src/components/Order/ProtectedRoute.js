// src/components/Order/ProtectedRoute.js

import { useAuth } from "../../context/AuthContext"; // useAuth 가져오기
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth(); // 인증 상태 가져오기

  if (!isAuthenticated) {
    return <Navigate to="/login" />; // 로그인되지 않았을 경우 로그인 페이지로 리디렉션
  }

  return children; // 인증된 경우 자식 컴포넌트 반환
};

export default ProtectedRoute;

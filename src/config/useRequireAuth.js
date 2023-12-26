import { useAuth } from './AuthContext';

const useToken = () => {
  const { token, login } = useAuth();

  const checkAndLogin = () => {
    const storedToken = localStorage.getItem('token');
    if (!token && storedToken) {
      login(storedToken);
    }
  };

  return { token, checkAndLogin };
};

export default useToken;

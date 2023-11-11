import RegisterForm from '../components/organisms/RegisterForm';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLocalStorage } from '../utils/localStorage';

const Register = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let user = getLocalStorage('user');
    if (user) {
      user = JSON.parse(user).value;
    }
    // const user = getCookie('user');
    if (user) {
      navigate('/');
    }
  });
  return <RegisterForm />;
};

export default Register;

import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import './login-button.styles.scss';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  const navigate = useNavigate();
  return (
    <button className="button-login" onClick={() => navigate('/login')}>
      Log In
    </button>
  );
};

export default LoginButton;

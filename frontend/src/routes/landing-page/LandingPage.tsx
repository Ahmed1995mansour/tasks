import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from '../../components/login-button/LoginButton';
import './landing-page.styles.scss';

const LandingPage = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <div className="landing-page">
      <div className="context">
        <h1>Welcome to Tasks</h1>
        <p>Here you can easily manage your Tasks to help achieve your Goals</p>
        <div className="register">
          <LoginButton />
        </div>
      </div>

      <div className="area">
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </div>
  );
};

export default LandingPage;

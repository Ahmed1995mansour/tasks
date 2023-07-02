import { useAuth0 } from '@auth0/auth0-react';

const Account = () => {
  const { user } = useAuth0();
  return (
    <>
      <h2>Welcome to your account</h2>
      <img src={user?.picture} alt="pic" />
      <br />
      {JSON.stringify(user)}
      <p>Profile : {user?.profile}</p>
    </>
  );
};

export default Account;

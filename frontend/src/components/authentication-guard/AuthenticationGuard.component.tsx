import { withAuthenticationRequired } from '@auth0/auth0-react';

type Props = {
  component: any;
};

const AuthenticationGuard: React.FC<Props> = ({ component }) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => <div>Loading....</div>,
  });

  return <Component />;
};

export default AuthenticationGuard;

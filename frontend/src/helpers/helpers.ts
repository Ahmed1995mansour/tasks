export const getAuth0Domain = (): string => {
  if (!process.env.REACT_APP_AUTH0_DOMAIN) {
    console.error('Missing Auth0 Domain');
    process.exit(1);
  }

  return process.env.REACT_APP_AUTH0_DOMAIN;
};

export const getAuth0ClientId = (): string => {
  if (!process.env.REACT_APP_AUTH0_CLIENT_ID) {
    console.error('Missing Auth0 Client ID');
    process.exit(1);
  }

  return process.env.REACT_APP_AUTH0_CLIENT_ID;
};

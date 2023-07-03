import axios from 'axios';

export const signUp = async ({ firstName, lastName, username, email, password }: any) => {
  const response = await axios.post(`http://localhost:5000/api/signup`, {
    firstName,
    lastName,
    username,
    email,
    password,
  });
  return response;
};

export const login = async ({ login, password }: any) => {
  const response = await axios.post(`http://localhost:5000/api/signin`, {
    login,
    password,
  });
  return response;
};

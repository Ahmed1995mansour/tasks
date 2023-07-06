import axios from 'axios';

const SERVER = process.env.REACT_APP_SERVER_URL;

export const signUp = async ({ firstName, lastName, username, email, password }: any) => {
  const response = await axios.post(`${SERVER}/api/signup`, {
    firstName,
    lastName,
    username,
    email,
    password,
  });
  return response;
};

export const login = async ({ login, password }: any) => {
  const response = await axios.post(`${SERVER}/api/signin`, {
    login,
    password,
  });
  return response;
};

export const addGoal = async ({ goal, config }: any) => {
  const response = await axios.post(`${SERVER}/api/goal`, goal, config);
  return response;
};

export const getGoals = async (config: any) => {
  return await axios.get(`${SERVER}/api/goal`, config);
};

export const addCategory = async ({ config, category }: any) => {
  console.log(config);
  return await axios.post(`${SERVER}/api/category`, category, config);
};

export const getCategories = async (config: any) => {
  return await axios.get(`${SERVER}/api/category`, config);
};

export const getCategoriesByGoal = async (goal: any, config: any) => {
  return await axios.get(`${SERVER}/api/category/categoriesbygoal/${goal}`, config);
};

export const addTask = async ({ task, config }: any) => {
  return await axios.post(`${SERVER}/api/tasks`, task, config);
};

export const getTasks = async (config: any) => {
  return await axios.get(`${SERVER}/api/tasks`, config);
};

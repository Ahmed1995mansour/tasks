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

export const addTask = async ({ task, config }: any) => {
  return await axios.post(`${SERVER}/api/tasks`, task, config);
};

export const updateTask = async ({ updatedTask, config }: any) => {
  return await axios.put(`${SERVER}/api/tasks/update/${updatedTask._id}`, updatedTask, config);
};

export const deleteTask = async ({ taskId, config }: any) => {
  return await axios.delete(`${SERVER}/api/tasks/${taskId}`, config);
};

export const getTasks = async (config: any, query: string, page: number, pageSize: number) => {
  return await axios.get(
    `${SERVER}/api/tasks/?q=${query}&page=${page}&pageSize=${pageSize}`,
    config
  );
};

export const getTasksCount = async (config: any, query: string) => {
  return await axios.get(`${SERVER}/api/tasks/count/?q=${query}`, config);
};

export const getTasksCountPerGoal = async (config: any, query: string, goalId: any) => {
  return await axios.get(`${SERVER}/api/tasks/countpergoal/${goalId}/?q=${query}`, config);
};

export const getTasksByDate = async (config: any, date: any) => {
  return await axios.get(`${SERVER}/api/tasks/tasksbydate/${date}`, config);
};

export const getTasksByGoal = async (
  config: any,
  goalId: any,
  query: string,
  page: number,
  pageSize: number
) => {
  return await axios.get(
    `${SERVER}/api/tasks/tasksbygoal/${goalId}/?q=${query}&page=${page}&pageSize=${pageSize}`,
    config
  );
};

export const markTaskComletede = async ({ config, taskId, done }: any) => {
  return await axios.put(`${SERVER}/api/tasks/${taskId}`, { done }, config);
};

export const getAllTasksPercentage = async (config: any) => {
  return await axios.get(`${SERVER}/api/tasks/percentage`, config);
};

export const getGoalTasksPercentage = async (config: any, goalId: any) => {
  return await axios.get(`${SERVER}/api/tasks/goalpercentage/${goalId}`, config);
};

export const getTaskById = async (config: any, taskId: any) => {
  return await axios.get(`${SERVER}/api/tasks/${taskId}`, config);
};

export const getGoalById = async (config: any, goalId: any) => {
  return await axios.get(`${SERVER}/api/goal/${goalId}`, config);
};

export const deleteGoalById = async ({ config, goalId }: any) => {
  return await axios.delete(`${SERVER}/api/goal/${goalId}`, config);
};

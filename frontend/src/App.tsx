import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import AuthenticationGuard from './components/authentication-guard/AuthenticationGuard.component';
import Header from './components/navbar/Header.component';
import Account from './routes/account/Account';
import Home from './routes/home-page/Home';
import LandingPage from './routes/landing-page/LandingPage';
import Loader from './routes/loader/Loader';
import Login from './routes/login/Login';
import Register from './routes/register/Register';

function App() {
  const [tasks, setTasks] = useState([]);
  const [date, setDate] = useState<Date>(new Date(moment().format('L')));
  const [completed, setCompleted] = useState(0);

  const selectDateFilter = (date: Date) => {
    setDate(date);
  };

  const getTasksByDate = async () => {
    const { data } = await axios.get(`http://localhost:5000/api/tasks/${date}`);

    if (data) {
      setTasks(data);
    }
    return data;
  };

  const getPercentage = async () => {
    const { data } = await axios.get(`http://localhost:5000/api/tasks/percentage`);
    setCompleted(Math.round(data));
  };

  const onAddingTask = () => {
    getTasksByDate();
    getPercentage();
  };

  useEffect(() => {
    getTasksByDate();
    getPercentage();
  }, [date]);

  const { isLoading, isAuthenticated } = useAuth0();

  return (
    <div className="App">
      <Routes>
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        {isLoading ? <Route path="/" element={<Loader />} /> : null}
        {isAuthenticated ? (
          <Route path="/" element={<Header />}>
            <Route
              index
              element={
                <Home
                  completed={completed}
                  selectDateFilter={selectDateFilter}
                  getTasksByDate={getTasksByDate}
                  tasks={tasks}
                  getPercentage={getPercentage}
                  onAddingTask={onAddingTask}
                />
              }
            />

            <Route path="/account" element={<AuthenticationGuard component={Account} />} />
          </Route>
        ) : (
          <Route path="/" element={<LandingPage />} />
        )}
      </Routes>

      <ToastContainer />
    </div>
  );
}

export default App;

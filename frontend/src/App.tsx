import axios from 'axios';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { RequireAuth } from 'react-auth-kit';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Header from './components/navbar/Header.component';
import Account from './routes/account/Account';
import Categories from './routes/categories/Categories';
import Goals from './routes/goals/Goals';
import Home from './routes/home-page/Home';
import Login from './routes/login/Login';
import Register from './routes/register/Register';
import Tasks from './routes/tasks/Tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [date, setDate] = useState<Date>(new Date(moment().format('L')));
  const [completed, setCompleted] = useState(0);

  const selectDateFilter = (date: Date) => {
    setDate(date);
  };

  // const getTasksByDate = async () => {
  //   const { data } = await axios.get(`http://localhost:5000/api/tasks/${date}`);

  //   if (data) {
  //     setTasks(data);
  //   }
  //   return data;
  // };

  // const onAddingTask = () => {
  //   getTasksByDate();
  //   getPercentage();
  // };

  // useEffect(() => {
  //   getTasksByDate();
  //   getPercentage();
  // }, [date]);

  const isAuthenticated = false;

  return (
    <div className="App">
      <Routes>
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="/" element={<Header />}>
          <Route
            index
            element={
              <RequireAuth loginPath="/login">
                <Home />
              </RequireAuth>
            }
          />
          <Route
            path="/goals"
            element={
              <RequireAuth loginPath="/login">
                <Goals />
              </RequireAuth>
            }
          />
          <Route
            path="/categories"
            element={
              <RequireAuth loginPath="/login">
                <Categories />
              </RequireAuth>
            }
          />
          <Route
            path="/account"
            element={
              <RequireAuth loginPath="/login">
                <Account />
              </RequireAuth>
            }
          />

          <Route
            path="/tasks"
            element={
              <RequireAuth loginPath="/login">
                <Tasks />
              </RequireAuth>
            }
          />
        </Route>

        {/* {isAuthenticated ? (
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
        )} */}
      </Routes>

      <ToastContainer />
    </div>
  );
}

export default App;

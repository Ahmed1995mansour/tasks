import { RequireAuth } from 'react-auth-kit';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Header from './components/navbar/Header.component';
import Account from './routes/account/Account';
import Goals from './routes/goals/Goals';
import Home from './routes/home-page/Home';
import Login from './routes/login/Login';
import Profile from './routes/profile/Profile';
import Register from './routes/register/Register';
import Tasks from './routes/tasks/Tasks';

function App() {
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
          <Route
            path="/profile"
            element={
              <RequireAuth loginPath="/login">
                <Profile />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>

      <ToastContainer />
    </div>
  );
}

export default App;

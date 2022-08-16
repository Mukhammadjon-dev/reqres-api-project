import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import UserDetail from './components/UserDetail';
import { useEffect } from 'react';
import { getUsers } from './redux/actions/usersAction';
import Login from './components/Login';
import Register from './components/register';
import Profile from './components/profile';
import AppBarResponsive from './components/AppBarResponsive';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';

function App() {
  useEffect(() => {
    getUsers(1);
  }, [])
  return (
    <div>
      <AppBarResponsive />
      <ToastContainer />
      <br />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users/:id" element={<UserDetail />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Profile/:id" element={<Profile />} />
      </Routes>
    </div>
  );
}
export default App;

import React from 'react';
import { useDispatch } from 'react-redux';
import authService from '../../appwrite/auth.js';
import { logout } from '../../store/authSlice.js';

function LogoutBtn() {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    authService
      .logout()
      .then(() => {
        dispatch(logout());
      })
      .catch((error) => {
        console.log('Error :: logout ::', error);
      });
  };

  return (
    <button
      onClick={logoutHandler}
      className="px-4 py-2 text-white duration-200 rounded-lg hover:bg-red-500 hover:text-white bg-red-600"
    >
      Logout
    </button>
  );
}

export default LogoutBtn;

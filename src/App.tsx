import React from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  return (
    <>
      <Outlet />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default App;

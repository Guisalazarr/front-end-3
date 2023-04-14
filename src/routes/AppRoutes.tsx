import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import DefaultLayout from '../config/Layout/DefaultLayout';
import LoginLayout from '../config/Layout/LoginLayout';
import Welcome from '../pages/Welcome';
import AddErrands from '../pages/AddErrands';
import Register from '../pages/Register';

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginLayout component={Welcome} />} />
        <Route path="/login" element={<LoginLayout component={Login} />} />
        <Route path="/register" element={<LoginLayout component={Register} />} />
        <Route path="/home" element={<DefaultLayout component={Home} />} />
        <Route path="/errands/:id" element={<DefaultLayout component={AddErrands} />} />
        <Route path="/errands" element={<DefaultLayout component={AddErrands} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;

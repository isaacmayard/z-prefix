import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import DetailsPage from "./DetailsPage";
import LoginPage from "./LoginPage";
import Register from "./Register";
import AdminPage from "./AdminPage";
import PersonalPage from './PersonalPage'

const RouteHandler = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/item/:id" element={<DetailsPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/adminpage" element={<AdminPage />} />
      <Route path="/personal" element={<PersonalPage />} />
    </Routes>
  );
};

export default RouteHandler;

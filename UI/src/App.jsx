import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ModelViewer from "./components/ModelViewer";
import Upload from "./pages/Upload";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route element={<MainLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/viewer/:id" element={<ModelViewer />} />
          <Route path="/upload" element={<Upload />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;

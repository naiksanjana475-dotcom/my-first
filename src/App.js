import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import Clients from "./components/Clients";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/clients" element={<Clients />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Import Router components and RouteProps
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import LoginPage from "./components/LoginPage/LoginPage.tsx";
import Dashboard from "./components/Dashboard/Dashboard.tsx";
import SignUp from "./components/SignUp/SignUp.tsx";
import { AppProvider } from "./AppContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<App />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  </React.StrictMode>
);

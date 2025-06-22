import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MainPage from "./pages/MainPage";
import { useUser, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";

export default function App() {
  const { isSignedIn } = useUser();

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={
            isSignedIn ? <Navigate to="/main" /> : <LoginPage />
          } 
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route 
          path="/main" 
          element={
            <RequireAuth>
              <MainPage />
            </RequireAuth>
          } 
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

function RequireAuth({ children }) {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}

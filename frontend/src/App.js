import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import SignIn from "scenes/auth/SignIn";
import Signup from "scenes/auth/Signup";
import MainLayout from "MainLayout";
import PrivateRoute from "components/PrivateRoute";
import { useDispatch } from "react-redux";
import { getAuthUser } from "features/auth/authApi";
import axios from "axios";




function App() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);





  useEffect(() => {
    const token = localStorage.getItem('token')

    if (!token) {
      return
    }

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    dispatch(getAuthUser())
      .then(res => {
        if (res) {
          navigate('/dashboard')
        }
      })

  }, [])






  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/dashboard/*" element={
            <PrivateRoute>
              <MainLayout />
            </PrivateRoute>}
          />

        </Routes>

      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;

import { useState, useEffect } from "react";
import styled from "styled-components";
import { BrowserRouter as Router } from "react-router";
import AuthProvider from "contexts/Auth";
import ReVisionLogo from "assets/ReVision.gif";
import AppRoutes from "./Routes";
import AppLayout from "./AppLayout";

const SplashWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .splash-logo {
    width: 30rem;
    height: auto;
  }
`;

const App = () => {
  const [showSplash, setShowSplash] = useState(() => {
    // Check if splash has been shown in this session
    const splashShown = sessionStorage.getItem("splashShown");
    return !splashShown;
  });

  useEffect(() => {
    if (showSplash) {
      // Mark splash as shown in session storage
      sessionStorage.setItem("splashShown", "true");

      const timer = setTimeout(() => {
        setShowSplash(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [showSplash]);

  if (showSplash) {
    return (
      <SplashWrapper>
        <img src={ReVisionLogo} alt="ReVision Logo" className="splash-logo" />
      </SplashWrapper>
    );
  }

  return (
    <Router>
      <AuthProvider>
        <AppLayout>
          <AppRoutes />
        </AppLayout>
      </AuthProvider>
    </Router>
  );
};

export default App;

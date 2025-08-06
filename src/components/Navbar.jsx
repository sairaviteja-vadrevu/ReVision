import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { Palette } from "lucide-react";
import { useTheme } from "contexts/ThemeContext";
import ThemeSidebar from "components/ThemeSidebar";

// Animations
const morphGradient = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const glow = keyframes`
  0%, 100% {
    box-shadow: 0 0 20px rgba(68, 80, 105, 0.4),
                0 0 40px rgba(68, 80, 105, 0.2),
                0 0 60px rgba(68, 80, 105, 0.1);
  }
  50% {
    box-shadow: 0 0 25px rgba(68, 80, 105, 0.6),
                0 0 50px rgba(68, 80, 105, 0.4),
                0 0 75px rgba(68, 80, 105, 0.2);
  }
`;

const NavbarContainer = styled.div`
  width: 100%;
  max-width: 48rem;
  margin: 0 auto;
  background: ${(props) => props.$gradient};
  background-size: 400% 400%;
  animation: ${morphGradient} 8s ease infinite;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.5rem;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  padding: 1rem 2rem;
  box-sizing: border-box;
  border-radius: 0 0 2rem 2rem;
  backdrop-filter: blur(20px);
  border: 2px solid transparent;
  background-clip: padding-box;
  animation: ${glow} 3s ease-in-out infinite alternate;

  &::before {
    content: "";
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(
      45deg,
      #ff6b6b,
      #4ecdc4,
      #45b7d1,
      #96ceb4,
      #ffeaa7
    );
    border-radius: 0 0 2rem 2rem;
    z-index: -1;
    animation: ${morphGradient} 5s linear infinite;
    opacity: 0.7;
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: inherit;
    border-radius: 0 0 2rem 2rem;
    z-index: -1;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const LogoText = styled.h1`
  font-size: 2.2rem;
  font-weight: 800;
  margin: 0;
  background: linear-gradient(45deg, #fff, #e3f2fd, #fff, #f3e5f5);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${morphGradient} 4s ease infinite;
  letter-spacing: 2px;
  position: relative;

  &::before {
    content: "ReVision";
    position: absolute;
    top: 0;
    left: 0;
    color: rgba(255, 255, 255, 0.2);
    transform: translate(1px, 1px);
    z-index: -1;
  }
`;

const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const ThemeButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
  padding: 1rem;
  border-radius: 50%;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.3) 0%,
      transparent 70%
    );
    transition: all 0.5s ease;
    transform: translate(-50%, -50%);
  }

  &:hover {
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    border-color: rgba(255, 255, 255, 0.8);
    background: ${(props) => props.$themeColor}40;

    &::before {
      width: 100px;
      height: 100px;
    }
  }

  &:active {
    transform: translateY(0) scale(0.98);
  }
`;

const StatusIndicator = styled.div`
  width: 12px;
  height: 12px;
  background: ${(props) => (props.$online ? "#4ecdc4" : "#ff6b6b")};
  border-radius: 50%;
  box-shadow: 0 0 10px ${(props) => (props.$online ? "#4ecdc4" : "#ff6b6b")};
  animation: ${glow} 2s ease-in-out infinite;
`;

const Navbar = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isThemeSidebarOpen, setIsThemeSidebarOpen] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const handleThemeToggle = () => {
    setIsThemeSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsThemeSidebarOpen(false);
  };

  return (
    <>
      <NavbarContainer $gradient={theme.gradient}>
        <Logo onClick={() => navigate("/")}>
          <LogoText>ReVision</LogoText>
        </Logo>

        <NavActions>
          <ThemeButton
            onClick={handleThemeToggle}
            $themeColor={theme.color}
            title="Change Theme"
          >
            <Palette size={20} />
          </ThemeButton>

          <StatusIndicator
            $online={isOnline}
            title={isOnline ? "Online" : "Offline"}
          />
        </NavActions>
      </NavbarContainer>

      <ThemeSidebar isOpen={isThemeSidebarOpen} onClose={handleCloseSidebar} />
    </>
  );
};

export default Navbar;

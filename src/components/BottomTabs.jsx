import { TABS } from "data/common";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useTheme } from "contexts/ThemeContext";

const BottomTabsWrapper = styled.div`
  width: 100%;
  max-width: 48rem;
  padding: 1rem;
  height: auto;
  background: ${props => props.$gradient};
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 -0.2rem 0.4rem rgba(0, 0, 0, 0.1);
  position: fixed;
  bottom: 0;
  z-index: 1000;
  box-sizing: border-box;
  transition: all 0.3s ease;
  border-radius: 5rem 5rem 0 0;
`;

const TabItem = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex: 1;
  color: inherit;
  text-decoration: none;
  transition: color 0.3s ease;

  span {
    color: ${(props) => (props.selected ? "#fff" : "#ccc")};
    opacity: ${(props) => (props.selected ? 1 : 0.7)};
  }
`;

const BottomTabs = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  
  return (
    <BottomTabsWrapper $gradient={theme.gradient}>
      {TABS?.map((tab, index) => {
        const isActive = window.location.pathname === tab.path;
        return (
          <TabItem
            key={index}
            onClick={() => navigate(tab.path)}
            selected={isActive}
          >
            <tab.icon
              style={{
                fontSize: "2rem",
                color: isActive ? "#fff" : "#ccc",
                opacity: isActive ? 1 : 0.7,
                transition: "color 0.3s ease, opacity 0.3s ease",
              }}
            />
            <span>{tab.title}</span>
          </TabItem>
        );
      })}
    </BottomTabsWrapper>
  );
};

export default BottomTabs;

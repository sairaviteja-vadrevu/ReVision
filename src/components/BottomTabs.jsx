import { TABS } from "data/common";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const BottomTabsWrapper = styled.div`
  width: 100%;
  max-width: 48rem;
  padding: 1rem;
  height: auto;
  background: linear-gradient(135deg, #111 0%, #445069 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 -0.2rem 0.4rem rgba(0, 0, 0, 0.1);
  position: fixed;
  bottom: 0;
  z-index: 1000;
  box-sizing: border-box;
  transition: background-color 0.3s ease;
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
  return (
    <BottomTabsWrapper>
      {TABS?.map((tab, index) => {
        return (
          <TabItem
            key={index}
            onClick={() => navigate(tab.path)}
            selected={window.location.pathname === tab.path}
          >
            <tab.icon
              style={{
                fontSize: "2rem",
                color: window.location.pathname === tab.path ? "#fff" : "#ccc",
                opacity: window.location.pathname === tab.path ? 1 : 0.7,
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

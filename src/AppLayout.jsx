import styled from "styled-components";
import Navbar from "components/Navbar";
import BottomTabs from "components/BottomTabs";

const AppLayoutWrapper = styled.div`
  width: 100%;
  max-width: 48rem;
  min-height: 100vh;
`;

const ChildrenWrapper = styled.div`
  min-height: 100vh;
  padding: 8rem 2rem;
`;

const AppLayout = ({ children }) => {
  return (
    <AppLayoutWrapper>
      <Navbar />
      <ChildrenWrapper>{children}</ChildrenWrapper>
      <BottomTabs />
    </AppLayoutWrapper>
  );
};

export default AppLayout;

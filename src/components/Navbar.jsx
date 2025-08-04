import styled from "styled-components";

const NavbarContainer = styled.div`
  width: 100%;
  max-width: 48rem;
  margin: 0 auto;
  background: linear-gradient(135deg, #111 0%, #445069 100%);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  box-shadow: 0 0.2rem 0.4rem rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  z-index: 1000;
  padding: 1rem;
  box-sizing: border-box;
  transition: background-color 0.3s ease;
  // border-radius: 0 0 5rem 5rem;
`;

const Navbar = () => {
  return (
    <NavbarContainer>
      <h1>ReVision</h1>
    </NavbarContainer>
  );
};
export default Navbar;

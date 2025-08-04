import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { TEMPLATES } from "data/common";

const HomeContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 2rem;
`;

const TemplateContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1rem;
`;

const TemplateHeader = styled.h2`
  font-size: 2rem;
  background: linear-gradient(135deg, #111, #445069);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 600;
`;

const TemplatesSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  overflow-x: auto;
  gap: 1rem;
`;

const TemplateItem = styled.div`
  width: 100%;
  max-width: 33rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 0.5rem;
  cursor: pointer;
`;

const TemplateImageSkeleton = styled.div`
  width: 100%;
  height: 15rem;
  background-color: #e0e0e0;
  border-radius: 0.8rem;
  box-shadow: 0 0.2rem 0.4rem rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s;
  &:hover {
    background-color: #d0d0d0;
  }
  animation: pulse 1.5s infinite ease-in-out;
  @keyframes pulse {
    0% {
      background-color: #e0e0e0;
    }
    50% {
      background-color: #d0d0d0;
    }
    100% {
      background-color: #e0e0e0;
    }
  }
`;

const TemplateThemeHeader = styled.h5`
  font-size: 1.5rem;
  font-weight: 400;
  white-space: nowrap;
  padding: 1rem;
  background: linear-gradient(135deg, #111, #445069);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const GuideBanner = styled.div`
  padding: 1rem;
  background: linear-gradient(135deg, #111 0%, #445069 100%);
  border-radius: 1.2rem;
  box-shadow: 0 0.4rem 1.2rem rgba(0, 0, 0, 0.15);
  color: white;
  text-align: center;
`;

const BannerTitle = styled.h1`
  font-size: 2.8rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, #ffffff, #e0e7ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const BannerSubtitle = styled.p`
  font-size: 1.6rem;
  font-weight: 400;
  opacity: 0.9;
  line-height: 1.5;
`;

const Home = () => {
  const navigate = useNavigate();

  const handleTemplateClick = (template, theme) => {
    navigate(
      `/${theme?.toLowerCase()}/${template?.name
        ?.toLowerCase()
        ?.replaceAll(" ", "-")}`,
      {
        state: { template, theme },
      }
    );
  };

  return (
    <HomeContainer>
      <GuideBanner>
        <BannerTitle>Choose Your Perfect Template</BannerTitle>
        <BannerSubtitle>
          Select one of our beautiful themes below to generate stunning images
          with AI
        </BannerSubtitle>
      </GuideBanner>

      {Object.keys(TEMPLATES).map((key) => {
        return (
          <TemplateContainer key={key}>
            <TemplateHeader>{key}</TemplateHeader>
            <TemplatesSection>
              {TEMPLATES[key].map((template, index) => {
                return (
                  <TemplateItem
                    key={index}
                    onClick={() => handleTemplateClick(template, key)}
                  >
                    <TemplateImageSkeleton />
                    {/* Placeholder for template image */}
                    {/* In a real application, you would replace this with an actual image */}
                    <TemplateThemeHeader>{template?.name}</TemplateThemeHeader>
                  </TemplateItem>
                );
              })}
            </TemplatesSection>
          </TemplateContainer>
        );
      })}
    </HomeContainer>
  );
};

export default Home;

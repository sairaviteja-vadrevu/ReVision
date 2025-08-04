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
  background: linear-gradient(135deg, #e0e0e0, #f0f0f0);
  border-radius: 0.8rem;
  box-shadow: 0 0.2rem 0.4rem rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  
  &:hover {
    background: linear-gradient(135deg, #d0d0d0, #e0e0e0);
    transform: translateY(-0.2rem);
    box-shadow: 0 0.4rem 0.8rem rgba(0, 0, 0, 0.15);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.4),
      transparent
    );
    animation: shimmer 2s infinite;
  }
  
  @keyframes shimmer {
    0% {
      left: -100%;
    }
    100% {
      left: 100%;
    }
  }
`;

const TemplateInitials = styled.div`
  font-size: 3rem;
  font-weight: 700;
  color: #445069;
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  z-index: 1;
  background: linear-gradient(135deg, #111, #445069);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
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

  const getInitials = (name) => {
    if (!name) return "T";
    
    return name
      .split(" ")
      .map(word => word.charAt(0))
      .join("")
      .substring(0, 2);
  };

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
                    <TemplateImageSkeleton>
                      <TemplateInitials>
                        {getInitials(template?.name)}
                      </TemplateInitials>
                    </TemplateImageSkeleton>
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

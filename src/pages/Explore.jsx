import styled, { keyframes } from "styled-components";

const float = keyframes`
  0%, 100% {
    transform: translateY(0rem);
  }
  50% {
    transform: translateY(-1rem);
  }
`;

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
`;

const glow = keyframes`
  0%, 100% {
    box-shadow: 0 0 2rem rgba(68, 80, 105, 0.3);
  }
  50% {
    box-shadow: 0 0 4rem rgba(68, 80, 105, 0.6);
  }
`;

const ExploreContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  overflow: hidden;
`;

const BackgroundDecoration = styled.div`
  position: absolute;
  width: 200%;
  height: 200%;
  background: radial-gradient(
      circle at 30% 70%,
      rgba(68, 80, 105, 0.1) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 70% 30%,
      rgba(17, 17, 17, 0.1) 0%,
      transparent 50%
    );
  animation: ${pulse} 4s ease-in-out infinite;
`;

const MainContent = styled.div`
  z-index: 2;
  max-width: 60rem;
  padding: 2rem;
`;

const ComingSoonTitle = styled.h1`
  font-size: 4.5rem;
  font-weight: 800;
  margin-bottom: 2rem;
  background: linear-gradient(135deg, #111 0%, #445069 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${float} 3s ease-in-out infinite;
`;

const SubTitle = styled.h2`
  font-size: 2.2rem;
  font-weight: 600;
  color: #445069;
  margin-bottom: 1.5rem;
  opacity: 0.8;
`;

const Description = styled.p`
  font-size: 1.6rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 3rem;
  max-width: 50rem;
`;

const FeatureList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 4rem;
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1.5rem 2rem;
  background: linear-gradient(
    135deg,
    rgba(68, 80, 105, 0.05) 0%,
    rgba(17, 17, 17, 0.05) 100%
  );
  border-radius: 1rem;
  border: 0.1rem solid rgba(68, 80, 105, 0.1);
  animation: ${glow} 3s ease-in-out infinite;
  animation-delay: ${(props) => props.delay || "0s"};
`;

const FeatureIcon = styled.div`
  font-size: 2rem;
  color: #445069;
`;

const FeatureText = styled.span`
  font-size: 1.4rem;
  color: #333;
  font-weight: 500;
`;

const NotifyButton = styled.button`
  padding: 1.5rem 3rem;
  font-size: 1.4rem;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, #111 0%, #445069 100%);
  border: none;
  border-radius: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0.4rem 1.2rem rgba(68, 80, 105, 0.3);

  &:hover {
    transform: translateY(-0.2rem);
    box-shadow: 0 0.8rem 2rem rgba(68, 80, 105, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

const Explore = () => {
  return (
    <ExploreContainer>
      <BackgroundDecoration />
      <MainContent>
        <ComingSoonTitle>Coming Soon</ComingSoonTitle>
        <SubTitle>Explore Gallery</SubTitle>
        <Description>
          Discover an amazing collection of AI-generated content from our
          community. Browse through stunning visuals, get inspired, and find
          your next creative spark.
        </Description>

        <FeatureList>
          <FeatureItem delay="0s">
            <FeatureIcon>🎨</FeatureIcon>
            <FeatureText>Browse community creations</FeatureText>
          </FeatureItem>
          <FeatureItem delay="0.5s">
            <FeatureIcon>🔍</FeatureIcon>
            <FeatureText>Search by style and theme</FeatureText>
          </FeatureItem>
          <FeatureItem delay="1s">
            <FeatureIcon>❤️</FeatureIcon>
            <FeatureText>Save your favorites</FeatureText>
          </FeatureItem>
        </FeatureList>

        <NotifyButton>Notify Me When Ready</NotifyButton>
      </MainContent>
    </ExploreContainer>
  );
};

export default Explore;

import styled from "styled-components";
import { useTheme } from "contexts/ThemeContext";

const AspectRatioContainer = styled.div`
  width: 100%;
  max-width: 50rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const SectionTitle = styled.h3`
  font-size: 2rem;
  font-weight: 600;
  color: ${props => props.$color};
  text-align: center;
`;

const AspectRatioGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(5rem, 1fr));
  gap: 1rem;
`;

const AspectRatioOption = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  border: 0.2rem solid ${(props) => (props.$isSelected ? props.$color : "#e0e0e0")};
  border-radius: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${(props) =>
    props.$isSelected ? props.$color + "15" : "transparent"};

  &:hover {
    border-color: ${props => props.$color};
    background: ${props => props.$color}10;
  }
`;

const AspectRatioLabel = styled.span`
  font-size: 1.4rem;
  font-weight: 500;
  color: ${(props) => (props.$isSelected ? props.$color : "#666")};
`;

const AspectRatioSelector = ({ selectedAspectRatio, onAspectRatioChange }) => {
  const { theme } = useTheme();
  
  const aspectRatios = [
    { label: "9:16", value: "9:16" },
    { label: "16:9", value: "16:9" },
    { label: "4:3", value: "4:3" },
    { label: "3:4", value: "3:4" },
    { label: "1:1", value: "1:1" },
  ];

  return (
    <AspectRatioContainer>
      <SectionTitle $color={theme.color}>Select Aspect Ratio</SectionTitle>
      <AspectRatioGrid>
        {aspectRatios.map((ratio) => (
          <AspectRatioOption
            key={ratio.value}
            $isSelected={selectedAspectRatio === ratio.value}
            $color={theme.color}
            onClick={() => onAspectRatioChange(ratio.value)}
          >
            <AspectRatioLabel 
              $isSelected={selectedAspectRatio === ratio.value}
              $color={theme.color}
            >
              {ratio.label}
            </AspectRatioLabel>
          </AspectRatioOption>
        ))}
      </AspectRatioGrid>
    </AspectRatioContainer>
  );
};

export default AspectRatioSelector;
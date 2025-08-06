import styled from "styled-components";
import { useTheme } from "contexts/ThemeContext";

const CustomPromptContainer = styled.div`
  width: 100%;
  max-width: 50rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const SectionTitle = styled.h3`
  font-size: 2rem;
  font-weight: 600;
  color: ${(props) => props.$color};
  text-align: center;
`;

const GenerationModeToggle = styled.div`
  display: flex;
  background: rgba(68, 80, 105, 0.1);
  border-radius: 1rem;
  padding: 0.4rem;
  margin-bottom: 1rem;
`;

const ModeOption = styled.button`
  flex: 1;
  padding: 1rem 2rem;
  font-size: 1.4rem;
  font-weight: 500;
  white-space: nowrap;
  color: ${(props) => (props.active ? "white" : props.$color)};
  background: ${(props) => (props.active ? props.$gradient : "transparent")};
  border: none;
  border-radius: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: "Sen", sans-serif;

  &:hover {
    background: ${(props) =>
      props.active ? props.$gradient : "rgba(68, 80, 105, 0.1)"};
  }
`;

const PromptTextArea = styled.textarea`
  min-height: 12rem;
  padding: 1.5rem;
  font-size: 1.4rem;
  font-family: "Sen", sans-serif;
  border: 0.2rem solid #e0e0e0;
  border-radius: 1rem;
  resize: vertical;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${(props) => props.$color};
    box-shadow: 0 0 0 0.3rem ${(props) => props.$color}20;
  }

  &::placeholder {
    color: #888;
  }
`;

const PromptCharCount = styled.div`
  font-size: 1.2rem;
  color: #666;
  text-align: right;
  margin-top: -0.5rem;
`;

const CustomPromptSection = ({
  customPrompt,
  setCustomPrompt,
  generationMode,
  setGenerationMode,
}) => {
  const { theme } = useTheme();

  return (
    <CustomPromptContainer>
      <SectionTitle $color={theme.color}>Custom Prompt</SectionTitle>
      <PromptTextArea
        value={customPrompt}
        onChange={(e) => setCustomPrompt(e.target.value)}
        placeholder="Enter your custom prompt here... Describe the image you want to create in detail."
        maxLength={2000}
        $color={theme.color}
      />
      <PromptCharCount>{customPrompt.length}/2000 characters</PromptCharCount>

      <GenerationModeToggle>
        <ModeOption
          active={generationMode === "with-image"}
          onClick={() => setGenerationMode("with-image")}
          $color={theme.color}
          $gradient={theme.gradient}
        >
          🖼️ With Reference Image
        </ModeOption>
        <ModeOption
          active={generationMode === "text-only"}
          onClick={() => setGenerationMode("text-only")}
          $color={theme.color}
          $gradient={theme.gradient}
        >
          ✨ Text Only
        </ModeOption>
      </GenerationModeToggle>
    </CustomPromptContainer>
  );
};

export default CustomPromptSection;

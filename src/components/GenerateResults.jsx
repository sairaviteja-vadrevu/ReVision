import styled from "styled-components";
import { useTheme } from "contexts/ThemeContext";

const ResultSection = styled.div`
  width: 100%;
  max-width: 50rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
`;

const SectionTitle = styled.h3`
  font-size: 2rem;
  font-weight: 600;
  color: ${props => props.$color};
  text-align: center;
`;

const ResultImage = styled.img`
  max-width: 100%;
  max-height: 50rem;
  border-radius: 1rem;
  box-shadow: 0 0.4rem 1.2rem rgba(0, 0, 0, 0.15);
`;

const ResultActions = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const DownloadButton = styled.button`
  padding: 1rem 2rem;
  font-size: 1.4rem;
  font-weight: 600;
  color: ${props => props.$color};
  background: transparent;
  border: 0.2rem solid ${props => props.$color};
  border-radius: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: "Sen", sans-serif;

  &:hover {
    background: ${props => props.$color};
    color: white;
  }
`;

const GenerateNewButton = styled.button`
  padding: 1rem 2rem;
  font-size: 1.4rem;
  font-weight: 600;
  color: white;
  background: ${props => props.$gradient};
  border: none;
  border-radius: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: "Sen", sans-serif;

  &:hover {
    transform: translateY(-0.1rem);
    box-shadow: 0 0.4rem 1rem rgba(0, 0, 0, 0.3);
  }
`;

const Toast = styled.div`
  position: fixed;
  top: 2rem;
  right: 2rem;
  padding: 1.5rem 2rem;
  background: linear-gradient(135deg, #27ae60, #2ecc71);
  color: white;
  border-radius: 0.8rem;
  box-shadow: 0 0.4rem 1.2rem rgba(0, 0, 0, 0.15);
  font-size: 1.4rem;
  font-weight: 500;
  z-index: 1000;
  animation: slideIn 0.3s ease-out;

  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

const GenerateResults = ({
  generatedImage,
  generationResult,
  showToast,
  onDownload,
  onGenerateNew,
}) => {
  const { theme } = useTheme();
  
  const downloadImage = async () => {
    if (!generatedImage) return;

    try {
      const response = await fetch(generatedImage);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `generated-image-${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading image:", error);
      if (onDownload) {
        onDownload(error);
      }
    }
  };

  if (!generatedImage) return null;

  return (
    <>
      <ResultSection>
        <SectionTitle $color={theme.color}>Generated Result</SectionTitle>
        <ResultImage src={generatedImage} alt="Generated" />
        <ResultActions>
          <DownloadButton onClick={downloadImage} $color={theme.color}>
            📥 Download Image
          </DownloadButton>
          <GenerateNewButton onClick={onGenerateNew} $gradient={theme.gradient}>
            ✨ Generate New
          </GenerateNewButton>
        </ResultActions>
      </ResultSection>

      {showToast && generationResult && (
        <Toast>
          {generationResult.message || "Image generated successfully!"}
        </Toast>
      )}
    </>
  );
};

export default GenerateResults;
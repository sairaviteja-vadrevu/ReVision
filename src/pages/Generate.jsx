import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import CustomPromptSection from "components/CustomPromptSection";
import ImageUpload from "components/ImageUpload";
import AspectRatioSelector from "components/AspectRatioSelector";
import GenerateResults from "components/GenerateResults";
import useImageHandler from "hooks/useImageHandler";
import { useTheme } from "contexts/ThemeContext";

const GenerateContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 3rem;
  padding: 2rem 0;
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const PageTitle = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: ${props => props.$gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const PageSubtitle = styled.p`
  font-size: 1.6rem;
  color: #666;
  opacity: 0.8;
`;

const GenerateButtonSection = styled.div`
  width: 100%;
  max-width: 50rem;
  display: flex;
  justify-content: center;
  padding: 2rem 0;
`;

const GenerateButton = styled.button`
  padding: 0 2rem;
  font-size: 1.6rem;
  font-weight: 600;
  color: white;
  background: ${props => props.$gradient};
  border: none;
  border-radius: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0.4rem 1.2rem rgba(0, 0, 0, 0.3);
  font-family: "Sen", sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 5.4rem;

  &:hover:not(:disabled) {
    transform: translateY(-0.2rem);
    box-shadow: 0 0.8rem 2rem rgba(68, 80, 105, 0.4);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 2rem;
  height: 2rem;
  border: 0.2rem solid transparent;
  border-top: 0.2rem solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-right: 1rem;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ErrorMessage = styled.div`
  padding: 1.5rem;
  background: rgba(255, 71, 87, 0.1);
  border: 0.1rem solid #ff4757;
  border-radius: 0.8rem;
  color: #ff4757;
  font-size: 1.4rem;
  text-align: center;
  max-width: 50rem;
  width: 100%;
`;

const Generate = () => {
  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate();
  const { theme } = useTheme();
  
  const isCustomMode = state?.mode === "custom" || location.pathname === "/custom";
  
  // Image handling hook
  const imageHandler = useImageHandler();
  
  // Generation states
  const [selectedAspectRatio, setSelectedAspectRatio] = useState("1:1");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [generationResult, setGenerationResult] = useState(null);
  
  // Custom mode states
  const [customPrompt, setCustomPrompt] = useState("");
  const [generationMode, setGenerationMode] = useState("with-image");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const validateGeneration = () => {
    if (isCustomMode) {
      if (!customPrompt.trim()) {
        return "Please enter a custom prompt";
      }
      
      if (generationMode === "with-image" && !imageHandler.hasValidImage()) {
        return "Please provide an image (upload or URL) for with-image generation";
      }
    } else {
      if (!imageHandler.hasValidImage() || !state?.template?.prompt) {
        return "Please provide an image (upload or URL) and ensure template data is available";
      }
    }
    return null;
  };

  const generateImage = async () => {
    const validationError = validateGeneration();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsGenerating(true);
    setError(null);
    setGeneratedImage(null);
    setGenerationResult(null);

    try {
      let inputImage = null;
      let promptToUse = "";
      
      if (isCustomMode) {
        promptToUse = customPrompt.trim();
        if (generationMode === "with-image") {
          inputImage = imageHandler.getInputImage();
          
          // Handle URL duplication fix
          if (imageHandler.inputMode === "url" && inputImage) {
            const urlParts = inputImage.split("http");
            if (urlParts.length > 2) {
              inputImage = "http" + urlParts[1];
            }
          }
        }
      } else {
        promptToUse = state.template.prompt;
        inputImage = imageHandler.getInputImage();
        
        if (imageHandler.inputMode === "url" && inputImage) {
          const urlParts = inputImage.split("http");
          if (urlParts.length > 2) {
            inputImage = "http" + urlParts[1];
          }
        }
      }

      const requestBody = {
        prompt: promptToUse,
        output_format: "jpg",
        aspect_ratio: selectedAspectRatio,
      };
      
      if (inputImage) {
        requestBody.input_image = inputImage;
      }

      const response = await fetch(
        "https://fastapi-app-production-6492.up.railway.app/api/v1/generate",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success && result.image_url) {
        setGeneratedImage(result.image_url);
        setGenerationResult(result);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 4000);
      } else {
        throw new Error(result.message || "Failed to generate image");
      }
    } catch (error) {
      setError(error.message || "Failed to generate image. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateNew = () => {
    setGeneratedImage(null);
    setGenerationResult(null);
    setError(null);
    setCustomPrompt("");
    setGenerationMode("with-image");
    setSelectedAspectRatio("1:1");
    imageHandler.clearAllImages();
    navigate("/");
  };

  const handleDownloadError = () => {
    setError("Failed to download image. Please try again.");
  };

  const canGenerate = () => {
    if (isCustomMode) {
      if (!customPrompt.trim() || isGenerating) return false;
      if (generationMode === "text-only") return true;
      return imageHandler.hasValidImage();
    } else {
      return imageHandler.hasValidImage() && state?.template?.prompt && !isGenerating;
    }
  };

  return (
    <GenerateContainer>
      <PageHeader>
        <PageTitle $gradient={theme.gradient}>
          {isCustomMode ? "Custom Generation" : "Generate Image"}
        </PageTitle>
        <PageSubtitle>
          {generatedImage
            ? "Your AI-generated image is ready!"
            : isCustomMode
            ? "Enter your custom prompt and generate unique images"
            : "Provide your image via upload or URL and select aspect ratio"}
        </PageSubtitle>
      </PageHeader>

      {!generatedImage && (
        <>
          {isCustomMode && (
            <CustomPromptSection
              customPrompt={customPrompt}
              setCustomPrompt={setCustomPrompt}
              generationMode={generationMode}
              setGenerationMode={setGenerationMode}
            />
          )}

          {(generationMode === "with-image" || !isCustomMode) && (
            <ImageUpload
              inputMode={imageHandler.inputMode}
              setInputMode={imageHandler.setInputMode}
              uploadedImage={imageHandler.uploadedImage}
              imageURL={imageHandler.imageURL}
              urlPreviewImage={imageHandler.urlPreviewImage}
              isDragOver={imageHandler.isDragOver}
              onFileChange={imageHandler.handleFileChange}
              onURLChange={(e) => {
                imageHandler.handleURLChange(e);
                setError(null);
              }}
              onURLPaste={(e) => {
                const error = imageHandler.handleURLPaste(e);
                if (error) setError(error);
                else setError(null);
              }}
              onDragOver={imageHandler.handleDragOver}
              onDragLeave={imageHandler.handleDragLeave}
              onDrop={imageHandler.handleDrop}
              onRemoveImage={imageHandler.handleRemoveImage}
              onClearURL={imageHandler.handleClearURL}
              formatFileSize={imageHandler.formatFileSize}
            />
          )}

          <AspectRatioSelector
            selectedAspectRatio={selectedAspectRatio}
            onAspectRatioChange={setSelectedAspectRatio}
          />

          <GenerateButtonSection>
            <GenerateButton 
              onClick={generateImage} 
              disabled={!canGenerate()}
              $gradient={theme.gradient}
            >
              {isGenerating && <LoadingSpinner />}
              {isGenerating ? "Generating..." : "Generate Image"}
            </GenerateButton>
          </GenerateButtonSection>
        </>
      )}

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <GenerateResults
        generatedImage={generatedImage}
        generationResult={generationResult}
        showToast={showToast}
        onDownload={handleDownloadError}
        onGenerateNew={handleGenerateNew}
      />
    </GenerateContainer>
  );
};

export default Generate;
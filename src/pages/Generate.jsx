import { useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

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
  background: linear-gradient(135deg, #111 0%, #445069 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const PageSubtitle = styled.p`
  font-size: 1.6rem;
  color: #666;
  opacity: 0.8;
`;

const UploadSection = styled.div`
  width: 100%;
  max-width: 50rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const InputToggle = styled.div`
  display: flex;
  background: rgba(68, 80, 105, 0.1);
  border-radius: 1rem;
  padding: 0.4rem;
  margin-bottom: 2rem;
`;

const ToggleOption = styled.button`
  flex: 1;
  padding: 1rem 2rem;
  font-size: 1.4rem;
  font-weight: 500;
  color: ${(props) => (props.active ? "white" : "#445069")};
  background: ${(props) =>
    props.active
      ? "linear-gradient(135deg, #111 0%, #445069 100%)"
      : "transparent"};
  border: none;
  border-radius: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: "Sen", sans-serif;

  &:hover {
    background: ${(props) =>
      props.active
        ? "linear-gradient(135deg, #111 0%, #445069 100%)"
        : "rgba(68, 80, 105, 0.1)"};
  }
`;

const URLInputSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const URLInput = styled.input`
  padding: 1.5rem;
  font-size: 1.4rem;
  border: 0.2rem solid #e0e0e0;
  border-radius: 1rem;
  font-family: "Sen", sans-serif;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #445069;
    box-shadow: 0 0 0 0.3rem rgba(68, 80, 105, 0.1);
  }

  &::placeholder {
    color: #888;
  }
`;

const URLPreviewSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
`;

const URLPreviewImage = styled.img`
  max-width: 100%;
  max-height: 30rem;
  border-radius: 1rem;
  box-shadow: 0 0.4rem 1.2rem rgba(0, 0, 0, 0.15);
`;

const URLInfo = styled.div`
  display: flex;
  gap: 2rem;
  font-size: 1.3rem;
  color: #666;
  flex-wrap: wrap;
  justify-content: center;
`;

const ClearURLButton = styled.button`
  padding: 0.8rem 1.5rem;
  font-size: 1.3rem;
  color: #ff4757;
  background: transparent;
  border: 0.1rem solid #ff4757;
  border-radius: 0.6rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: "Sen", sans-serif;

  &:hover {
    background: #ff4757;
    color: white;
  }
`;

const UploadArea = styled.div`
  width: 100%;
  min-height: 20rem;
  border: 0.2rem dashed ${(props) => (props.isDragOver ? "#445069" : "#ccc")};
  border-radius: 1.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${(props) =>
    props.isDragOver ? "rgba(68, 80, 105, 0.05)" : "transparent"};
  position: relative;

  &:hover {
    border-color: #445069;
    background: rgba(68, 80, 105, 0.03);
  }
`;

const UploadIcon = styled.div`
  font-size: 4rem;
  color: #445069;
  opacity: 0.7;
`;

const UploadText = styled.div`
  text-align: center;
`;

const UploadTitle = styled.h3`
  font-size: 2rem;
  font-weight: 600;
  color: #445069;
  margin-bottom: 0.5rem;
`;

const UploadSubtext = styled.p`
  font-size: 1.4rem;
  color: #888;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const ImagePreview = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
`;

const PreviewImage = styled.img`
  max-width: 100%;
  max-height: 30rem;
  border-radius: 1rem;
  box-shadow: 0 0.4rem 1.2rem rgba(0, 0, 0, 0.15);
`;

const ImageInfo = styled.div`
  display: flex;
  gap: 2rem;
  font-size: 1.3rem;
  color: #666;
`;

const RemoveButton = styled.button`
  padding: 0.8rem 1.5rem;
  font-size: 1.3rem;
  color: #ff4757;
  background: transparent;
  border: 0.1rem solid #ff4757;
  border-radius: 0.6rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: "Sen", sans-serif;

  &:hover {
    background: #ff4757;
    color: white;
  }
`;

const AspectRatioSection = styled.div`
  width: 100%;
  max-width: 50rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const SectionTitle = styled.h3`
  font-size: 2rem;
  font-weight: 600;
  color: #445069;
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
  border: 0.2rem solid ${(props) => (props.isSelected ? "#445069" : "#e0e0e0")};
  border-radius: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${(props) =>
    props.isSelected ? "rgba(68, 80, 105, 0.05)" : "transparent"};

  &:hover {
    border-color: #445069;
    background: rgba(68, 80, 105, 0.03);
  }
`;

const AspectRatioPreview = styled.div`
  width: 6rem;
  height: ${(props) => {
    const ratio = props.ratio;
    const width = 60;
    if (ratio === "9:16") return `${(width * 16) / 9}px`;
    if (ratio === "16:9") return `${(width * 9) / 16}px`;
    if (ratio === "4:3") return `${(width * 3) / 4}px`;
    if (ratio === "3:4") return `${(width * 4) / 3}px`;
    return `${width}px`; // 1:1
  }};
  background: linear-gradient(135deg, #111 0%, #445069 100%);
  border-radius: 0.4rem;
`;

const AspectRatioLabel = styled.span`
  font-size: 1.4rem;
  font-weight: 500;
  color: ${(props) => (props.isSelected ? "#445069" : "#666")};
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
  background: linear-gradient(135deg, #111 0%, #445069 100%);
  border: none;
  border-radius: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0.4rem 1.2rem rgba(68, 80, 105, 0.3);
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
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const ResultSection = styled.div`
  width: 100%;
  max-width: 50rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
`;

const ResultImage = styled.img`
  max-width: 100%;
  max-height: 50rem;
  border-radius: 1rem;
  box-shadow: 0 0.4rem 1.2rem rgba(0, 0, 0, 0.15);
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
  color: #445069;
  background: transparent;
  border: 0.2rem solid #445069;
  border-radius: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: "Sen", sans-serif;

  &:hover {
    background: #445069;
    color: white;
  }
`;

const GenerateNewButton = styled.button`
  padding: 1rem 2rem;
  font-size: 1.4rem;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, #111 0%, #445069 100%);
  border: none;
  border-radius: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: "Sen", sans-serif;

  &:hover {
    transform: translateY(-0.1rem);
    box-shadow: 0 0.4rem 1rem rgba(68, 80, 105, 0.3);
  }
`;

const Generate = () => {
  const location = useLocation();
  const { state } = location;
  const fileInputRef = useRef(null);

  const [inputMode, setInputMode] = useState("upload"); // "upload" or "url"
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imageBase64, setImageBase64] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [urlPreviewImage, setUrlPreviewImage] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedAspectRatio, setSelectedAspectRatio] = useState("1:1");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [generationResult, setGenerationResult] = useState(null);

  const aspectRatios = [
    { label: "9:16", value: "9:16" },
    { label: "16:9", value: "16:9" },
    { label: "4:3", value: "4:3" },
    { label: "3:4", value: "3:4" },
    { label: "1:1", value: "1:1" },
  ];

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileSelect = async (file) => {
    if (file && file.type.startsWith("image/")) {
      try {
        const base64 = await convertToBase64(file);
        setImageBase64(base64);
        setUploadedImage({
          file,
          name: file.name,
          size: file.size,
          preview: URL.createObjectURL(file),
        });
      } catch (error) {
        console.error("Error converting to base64:", error);
      }
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleFileSelect(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const handleRemoveImage = () => {
    setUploadedImage(null);
    setImageBase64("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleURLChange = (e) => {
    const url = e.target.value;
    console.log("handleURLChange - input value:", url);
    console.log("handleURLChange - current imageURL:", imageURL);
    
    setImageURL(url);

    // Clear previous preview when URL changes
    if (urlPreviewImage) {
      setUrlPreviewImage(null);
    }

    // Debounce URL validation
    if (url.trim()) {
      setTimeout(() => {
        if (url === imageURL) {
          // Only proceed if URL hasn't changed
          console.log("handleURLChange - validating URL:", url);
          validateImageURL(url);
        }
      }, 500);
    }
  };

  const handleURLPaste = (e) => {
    e.preventDefault(); // Prevent default paste behavior
    const pastedText = e.clipboardData.getData('text').trim();
    console.log("handleURLPaste - pasted text:", pastedText);
    console.log("handleURLPaste - current imageURL:", imageURL);
    
    // Check if pasted text looks like an image URL
    const imageUrlPattern = /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i;
    const generalUrlPattern = /^https?:\/\/.+/i;
    
    if (imageUrlPattern.test(pastedText) || generalUrlPattern.test(pastedText)) {
      console.log("handleURLPaste - setting new URL:", pastedText);
      setImageURL(pastedText);
      
      // Clear previous preview
      if (urlPreviewImage) {
        setUrlPreviewImage(null);
      }
      
      // Immediately validate the pasted URL for instant preview
      setTimeout(() => {
        console.log("handleURLPaste - validating URL:", pastedText);
        validateImageURL(pastedText);
      }, 100);
    }
  };

  const validateImageURL = async (url) => {
    console.log("validateImageURL - validating:", url);
    try {
      setError(null);

      // Basic URL validation
      const urlPattern = /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i;
      if (!urlPattern.test(url)) {
        // Try to load the image anyway, as some URLs might not have extensions
        console.log("validateImageURL - URL doesn't match pattern, trying to load anyway");
        await loadImageFromURL(url);
      } else {
        console.log("validateImageURL - URL matches pattern, loading");
        await loadImageFromURL(url);
      }
    } catch (error) {
      console.error("URL validation error:", error);
      setError("Invalid image URL or unable to load image");
      setUrlPreviewImage(null);
    }
  };

  const loadImageFromURL = (url) => {
    console.log("loadImageFromURL - loading:", url);
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";

      img.onload = () => {
        console.log("loadImageFromURL - image loaded successfully");
        setUrlPreviewImage({
          url: url,
          width: img.naturalWidth,
          height: img.naturalHeight,
          size: "Unknown",
        });
        setError(null);
        resolve(img);
      };

      img.onerror = () => {
        console.log("loadImageFromURL - image failed to load");
        reject(new Error("Failed to load image from URL"));
      };

      img.src = url;
    });
  };

  const handleClearURL = () => {
    setImageURL("");
    setUrlPreviewImage(null);
    setError(null);
  };

  const handleModeToggle = (mode) => {
    setInputMode(mode);
    setError(null);

    // Clear the other input when switching modes
    if (mode === "upload") {
      setImageURL("");
      setUrlPreviewImage(null);
    } else {
      setUploadedImage(null);
      setImageBase64("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const generateImage = async () => {
    // Validation based on input mode
    const hasUploadedImage = inputMode === "upload" && imageBase64;
    const hasValidURL = inputMode === "url" && imageURL && urlPreviewImage;

    if ((!hasUploadedImage && !hasValidURL) || !state?.template?.prompt) {
      setError(
        "Please provide an image (upload or URL) and ensure template data is available"
      );
      return;
    }

    setIsGenerating(true);
    setError(null);
    setGeneratedImage(null);
    setGenerationResult(null);

    try {
      // Prepare input image based on mode
      let inputImage = inputMode === "upload" ? imageBase64 : imageURL;
      
      // Safety check: ensure URL isn't duplicated
      if (inputMode === "url" && inputImage) {
        // Remove any duplicate URLs that might be concatenated
        const urlParts = inputImage.split('http');
        if (urlParts.length > 2) {
          // Take the first complete URL
          inputImage = 'http' + urlParts[1];
          console.log("Fixed duplicated URL:", inputImage);
        }
      }
      
      // Debug log to check what's being sent
      console.log("Sending to API:", {
        prompt: state.template.prompt,
        input_image: inputImage,
        output_format: "jpg",
        aspect_ratio: selectedAspectRatio,
        inputMode,
      });

      const response = await fetch(
        "https://fastapi-app-production-6492.up.railway.app/api/v1/generate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: state.template.prompt,
            input_image: inputImage,
            output_format: "jpg",
            aspect_ratio: selectedAspectRatio,
          }),
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

        // Hide toast after 4 seconds
        setTimeout(() => {
          setShowToast(false);
        }, 4000);
      } else {
        throw new Error(result.message || "Failed to generate image");
      }
    } catch (error) {
      console.error("Error generating image:", error);
      setError(error.message || "Failed to generate image. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

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
      setError("Failed to download image. Please try again.");
    }
  };

  const generateNewImage = () => {
    setGeneratedImage(null);
    setGenerationResult(null);
    setError(null);
    setUploadedImage(null);
    setImageBase64("");
    setImageURL("");
    setUrlPreviewImage(null);
    setInputMode("upload");
    setSelectedAspectRatio("1:1");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const canGenerate = () => {
    const hasUploadedImage =
      inputMode === "upload" && uploadedImage && imageBase64;
    const hasValidURL = inputMode === "url" && imageURL && urlPreviewImage;
    return (
      (hasUploadedImage || hasValidURL) &&
      state?.template?.prompt &&
      !isGenerating
    );
  };

  console.log("Generate page state:", state);
  console.log("Base64:", imageBase64);
  console.log("Selected aspect ratio:", selectedAspectRatio);

  return (
    <GenerateContainer>
      <PageHeader>
        <PageTitle>Generate Image</PageTitle>
        <PageSubtitle>
          {generatedImage
            ? "Your AI-generated image is ready!"
            : "Provide your image via upload or URL and select aspect ratio"}
        </PageSubtitle>
      </PageHeader>

      {!generatedImage && (
        <>
          <UploadSection>
            <InputToggle>
              <ToggleOption
                active={inputMode === "upload"}
                onClick={() => handleModeToggle("upload")}
              >
                📁 Upload Image
              </ToggleOption>
              <ToggleOption
                active={inputMode === "url"}
                onClick={() => handleModeToggle("url")}
              >
                🔗 Image URL
              </ToggleOption>
            </InputToggle>

            {inputMode === "upload" ? (
              <>
                {!uploadedImage ? (
                  <UploadArea
                    isDragOver={isDragOver}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <HiddenFileInput
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                    <UploadIcon>📁</UploadIcon>
                    <UploadText>
                      <UploadTitle>Upload Image</UploadTitle>
                      <UploadSubtext>
                        Drag and drop or click to select
                      </UploadSubtext>
                    </UploadText>
                  </UploadArea>
                ) : (
                  <ImagePreview>
                    <PreviewImage src={uploadedImage.preview} alt="Preview" />
                    <ImageInfo>
                      <span>{uploadedImage.name}</span>
                      <span>{formatFileSize(uploadedImage.size)}</span>
                    </ImageInfo>
                    <RemoveButton onClick={handleRemoveImage}>
                      Remove Image
                    </RemoveButton>
                  </ImagePreview>
                )}
              </>
            ) : (
              <URLInputSection>
                <URLInput
                  type="url"
                  value={imageURL}
                  onChange={handleURLChange}
                  onPaste={handleURLPaste}
                  placeholder="Paste image URL here (e.g., https://example.com/image.jpg)"
                />
                {urlPreviewImage && (
                  <URLPreviewSection>
                    <URLPreviewImage
                      src={urlPreviewImage.url}
                      alt="URL Preview"
                    />
                    <URLInfo>
                      <span>
                        Size: {urlPreviewImage.width} × {urlPreviewImage.height}
                      </span>
                      <span>Source: URL</span>
                    </URLInfo>
                    <ClearURLButton onClick={handleClearURL}>
                      Clear URL
                    </ClearURLButton>
                  </URLPreviewSection>
                )}
              </URLInputSection>
            )}
          </UploadSection>

          <AspectRatioSection>
            <SectionTitle>Select Aspect Ratio</SectionTitle>
            <AspectRatioGrid>
              {aspectRatios.map((ratio) => (
                <AspectRatioOption
                  key={ratio.value}
                  isSelected={selectedAspectRatio === ratio.value}
                  onClick={() => setSelectedAspectRatio(ratio.value)}
                >
                  {/* <AspectRatioPreview ratio={ratio.value} /> */}
                  <AspectRatioLabel
                    isSelected={selectedAspectRatio === ratio.value}
                  >
                    {ratio.label}
                  </AspectRatioLabel>
                </AspectRatioOption>
              ))}
            </AspectRatioGrid>
          </AspectRatioSection>

          <GenerateButtonSection>
            <GenerateButton onClick={generateImage} disabled={!canGenerate()}>
              {isGenerating && <LoadingSpinner />}
              {isGenerating ? "Generating..." : "Generate Image"}
            </GenerateButton>
          </GenerateButtonSection>
        </>
      )}

      {error && <ErrorMessage>{error}</ErrorMessage>}

      {generatedImage && (
        <ResultSection>
          <SectionTitle>Generated Result</SectionTitle>
          <ResultImage src={generatedImage} alt="Generated" />
          <ResultActions>
            <DownloadButton onClick={downloadImage}>
              📥 Download Image
            </DownloadButton>
            <GenerateNewButton onClick={generateNewImage}>
              ✨ Generate New
            </GenerateNewButton>
          </ResultActions>
        </ResultSection>
      )}

      {showToast && generationResult && (
        <Toast>
          {generationResult.message || "Image generated successfully!"}
        </Toast>
      )}
    </GenerateContainer>
  );
};

export default Generate;

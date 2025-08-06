import { useRef } from "react";
import styled from "styled-components";
import { useTheme } from "contexts/ThemeContext";

const UploadContainer = styled.div`
  width: 100%;
  max-width: 50rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const InputToggle = styled.div`
  display: flex;
  background: ${(props) => `${props.$themeColor}20`};
  border-radius: 1rem;
  padding: 0.4rem;
  margin-bottom: 2rem;
`;

const ToggleOption = styled.button`
  flex: 1;
  padding: 1rem 2rem;
  font-size: 1.4rem;
  font-weight: 500;
  color: ${(props) => (props.active ? "white" : props.$themeColor)};
  background: ${(props) =>
    props.active ? props.$gradient : "transparent"};
  border: none;
  border-radius: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: "Sen", sans-serif;

  &:hover {
    background: ${(props) =>
      props.active ? props.$gradient : `${props.$themeColor}20`};
  }
`;

const UploadArea = styled.div`
  width: 100%;
  min-height: 20rem;
  border: 0.2rem dashed ${(props) => (props.$isDragOver ? props.$themeColor : "#ccc")};
  border-radius: 1.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${(props) =>
    props.$isDragOver ? `${props.$themeColor}10` : "transparent"};

  &:hover {
    border-color: ${(props) => props.$themeColor};
    background: ${(props) => `${props.$themeColor}08`};
  }
`;

const UploadIcon = styled.div`
  font-size: 4rem;
  color: ${(props) => props.$themeColor};
  opacity: 0.7;
`;

const UploadText = styled.div`
  text-align: center;
`;

const UploadTitle = styled.h3`
  font-size: 2rem;
  font-weight: 600;
  color: ${(props) => props.$themeColor};
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
    border-color: ${(props) => props.$themeColor};
    box-shadow: 0 0 0 0.3rem ${(props) => `${props.$themeColor}20`};
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

const ImageUpload = ({
  inputMode,
  setInputMode,
  uploadedImage,
  imageURL,
  urlPreviewImage,
  isDragOver,
  onFileChange,
  onURLChange,
  onURLPaste,
  onDragOver,
  onDragLeave,
  onDrop,
  onRemoveImage,
  onClearURL,
  formatFileSize,
}) => {
  const fileInputRef = useRef(null);
  const { theme } = useTheme();

  const handleModeToggle = (mode) => {
    setInputMode(mode);
  };

  return (
    <UploadContainer>
      <InputToggle $themeColor={theme.color}>
        <ToggleOption
          active={inputMode === "upload"}
          onClick={() => handleModeToggle("upload")}
          $themeColor={theme.color}
          $gradient={theme.gradient}
        >
          📁 Upload Image
        </ToggleOption>
        <ToggleOption
          active={inputMode === "url"}
          onClick={() => handleModeToggle("url")}
          $themeColor={theme.color}
          $gradient={theme.gradient}
        >
          🔗 Image URL
        </ToggleOption>
      </InputToggle>

      {inputMode === "upload" ? (
        <>
          {!uploadedImage ? (
            <UploadArea
              $isDragOver={isDragOver}
              $themeColor={theme.color}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <HiddenFileInput
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={onFileChange}
              />
              <UploadIcon $themeColor={theme.color}>📁</UploadIcon>
              <UploadText>
                <UploadTitle $themeColor={theme.color}>Upload Image</UploadTitle>
                <UploadSubtext>Drag and drop or click to select</UploadSubtext>
              </UploadText>
            </UploadArea>
          ) : (
            <ImagePreview>
              <PreviewImage src={uploadedImage.preview} alt="Preview" />
              <ImageInfo>
                <span>{uploadedImage.name}</span>
                <span>{formatFileSize(uploadedImage.size)}</span>
              </ImageInfo>
              <RemoveButton onClick={onRemoveImage}>Remove Image</RemoveButton>
            </ImagePreview>
          )}
        </>
      ) : (
        <URLInputSection>
          <URLInput
            type="url"
            value={imageURL}
            onChange={onURLChange}
            onPaste={onURLPaste}
            placeholder="Paste image URL here (e.g., https://example.com/image.jpg)"
            $themeColor={theme.color}
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
              <ClearURLButton onClick={onClearURL}>Clear URL</ClearURLButton>
            </URLPreviewSection>
          )}
        </URLInputSection>
      )}
    </UploadContainer>
  );
};

export default ImageUpload;
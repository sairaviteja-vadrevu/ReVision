import { useState, useRef } from "react";
import styled from "styled-components";
import moment from "moment";
import { Download, Eye, Trash2 } from "lucide-react";

const MasonryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(30rem, 1fr));
  gap: 2rem;
  padding: 2rem 0;
  width: 100%;
`;

const MasonryItem = styled.div`
  break-inside: avoid;
  margin-bottom: 2rem;
  position: relative;
  border-radius: 1.2rem;
  overflow: hidden;
  box-shadow: 0 0.4rem 1.2rem rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  background: white;

  &:hover {
    transform: translateY(-0.5rem);
    box-shadow: 0 0.8rem 2.4rem rgba(0, 0, 0, 0.15);
  }
`;

const MasonryImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
  border-radius: 1.2rem 1.2rem 0 0;
  object-fit: cover;
  background-color: #f0f0f0;
  min-height: 20rem;
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    transparent 60%,
    rgba(0, 0, 0, 0.7) 100%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex;
  align-items: flex-end;
  padding: 2rem;
  border-radius: 1.2rem;

  ${MasonryItem}:hover & {
    opacity: 1;
  }
`;

const ImageInfo = styled.div`
  color: white;
  width: 100%;
`;

const ImageDate = styled.p`
  font-size: 1.2rem;
  margin: 0;
  opacity: 0.9;
`;

const ActionButtons = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  gap: 0.5rem;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 10;

  ${MasonryItem}:hover & {
    opacity: 1;
  }
`;

const ActionButton = styled.button`
  padding: 0.8rem;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1.6rem;
  width: 4rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: white;
    transform: scale(1.1);
  }
`;

const LoadingItem = styled.div`
  width: 100%;
  height: ${(props) => props.height || "25rem"};
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 1.2rem;

  @keyframes loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;

const ImagePlaceholder = styled.div`
  width: 100%;
  height: 20rem;
  background: linear-gradient(135deg, #f0f0f0, #e0e0e0);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #666;
  font-size: 1.4rem;
  border-radius: 1.2rem 1.2rem 0 0;
`;

const MasonryLayout = ({
  items = [],
  loading = false,
  onDownload,
  onView,
  onDelete,
  loadingCount = 6,
}) => {
  const [imageHeights, setImageHeights] = useState({}); // eslint-disable-line
  const [imageErrors, setImageErrors] = useState({});
  const imageRefs = useRef({});

  const handleImageLoad = (index, event) => {
    const img = event.target;
    setImageHeights((prev) => ({
      ...prev,
      [index]: img.naturalHeight,
    }));
    // Clear any previous error for this image
    setImageErrors((prev) => ({
      ...prev,
      [index]: false,
    }));
  };

  const handleImageError = (index, event) => {
    console.error(`Image ${index} failed to load:`, event.target.src);
    setImageErrors((prev) => ({
      ...prev,
      [index]: true,
    }));
  };

  const handleDownload = async (imageUrl, index) => {
    if (onDownload) {
      onDownload(imageUrl, index);
    } else {
      try {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = `generation-${Date.now()}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Error downloading image:", error);
      }
    }
  };

  const handleView = (item, index) => {
    if (onView) {
      onView(item, index);
    }
  };

  const handleDelete = (item, index) => {
    if (onDelete) {
      onDelete(item, index);
    }
  };

  if (loading) {
    return (
      <MasonryContainer>
        {Array.from({ length: loadingCount }).map((_, index) => (
          <LoadingItem key={index} height={`${Math.random() * 20 + 25}rem`} />
        ))}
      </MasonryContainer>
    );
  }

  return (
    <MasonryContainer>
      {items.map((item, index) => {
        return (
          <MasonryItem key={index}>
            {imageErrors[index] ? (
              <ImagePlaceholder>
                <div>🖼️</div>
                <div>Image not available</div>
                <div style={{ fontSize: "1.2rem", marginTop: "0.5rem" }}>
                  URL: {item.output_url?.substring(0, 50)}...
                </div>
              </ImagePlaceholder>
            ) : (
              <MasonryImage
                ref={(el) => (imageRefs.current[index] = el)}
                src={item.output_url}
                alt={`Generation ${index + 1}`}
                onLoad={(e) => handleImageLoad(index, e)}
                onError={(e) => handleImageError(index, e)}
                onClick={() => handleView(item, index)}
              />
            )}

            <ActionButtons>
              <ActionButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleDownload(item.output_url, index);
                }}
                title="Download"
                style={{
                  cursor: "pointer",
                }}
              >
                <Download size={18} style={{ pointerEvents: "none" }} />
              </ActionButton>
              <ActionButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleView(item, index);
                }}
                title="View"
                style={{
                  cursor: "pointer",
                }}
              >
                <Eye size={18} style={{ pointerEvents: "none" }} />
              </ActionButton>
              {onDelete && (
                <ActionButton
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(item, index);
                  }}
                  title="Delete"
                  style={{
                    background: "rgba(255, 71, 87, 0.9)",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  <Trash2 size={18} style={{ pointerEvents: "none" }} />
                </ActionButton>
              )}
            </ActionButtons>

            <ImageOverlay>
              <ImageInfo>
                <ImageDate>
                  {moment(item.created_at).format("MMM DD YY")}
                </ImageDate>
              </ImageInfo>
            </ImageOverlay>
          </MasonryItem>
        );
      })}
    </MasonryContainer>
  );
};

export default MasonryLayout;

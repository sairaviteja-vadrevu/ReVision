import { useState } from "react";

const useImageHandler = () => {
  const [inputMode, setInputMode] = useState("upload");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imageBase64, setImageBase64] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [urlPreviewImage, setUrlPreviewImage] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);

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
  };

  const loadImageFromURL = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();

      img.onload = () => {
        setUrlPreviewImage({
          url: url,
          width: img.naturalWidth,
          height: img.naturalHeight,
          size: "Unknown",
        });
        resolve(img);
      };

      img.onerror = (error) => {
        if (!img.crossOrigin) {
          img.crossOrigin = "anonymous";
          img.src = url;
          return;
        }
        reject(new Error("Failed to load image from URL"));
      };

      img.src = url;
    });
  };

  const validateImageURL = async (url) => {
    try {
      const urlPattern =
        /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp|bmp|svg)(\?.*)?$/i;
      await loadImageFromURL(url);
      return null; // No error
    } catch (error) {
      setUrlPreviewImage(null);
      return "Invalid URL or image not found. Please check the URL and try again.";
    }
  };

  const handleURLChange = (e) => {
    const url = e.target.value;
    setImageURL(url);

    if (urlPreviewImage) {
      setUrlPreviewImage(null);
    }

    if (url.trim()) {
      setTimeout(() => {
        validateImageURL(url);
      }, 500);
    }
  };

  const handleURLPaste = (e) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text").trim();

    const imageUrlPattern =
      /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp|bmp|svg)(\?.*)?$/i;
    const generalUrlPattern = /^https?:\/\/.+/i;

    if (
      imageUrlPattern.test(pastedText) ||
      generalUrlPattern.test(pastedText)
    ) {
      setImageURL(pastedText);
      if (urlPreviewImage) {
        setUrlPreviewImage(null);
      }
      setTimeout(() => {
        validateImageURL(pastedText);
      }, 100);
      return null; // No error
    } else {
      return "Please paste a valid image URL";
    }
  };

  const handleClearURL = () => {
    setImageURL("");
    setUrlPreviewImage(null);
  };

  const handleModeToggle = (mode, onClear) => {
    setInputMode(mode);
    if (onClear) onClear();

    if (mode === "upload") {
      setImageURL("");
      setUrlPreviewImage(null);
    } else {
      setUploadedImage(null);
      setImageBase64("");
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const hasValidImage = () => {
    const hasUploadedImage =
      inputMode === "upload" && uploadedImage && imageBase64;
    const hasValidURL = inputMode === "url" && imageURL && urlPreviewImage;
    return hasUploadedImage || hasValidURL;
  };

  const getInputImage = () => {
    return inputMode === "upload" ? imageBase64 : imageURL;
  };

  const clearAllImages = (fileInputRef) => {
    setUploadedImage(null);
    setImageBase64("");
    setImageURL("");
    setUrlPreviewImage(null);
    setInputMode("upload");
    if (fileInputRef?.current) {
      fileInputRef.current.value = "";
    }
  };

  return {
    // State
    inputMode,
    uploadedImage,
    imageBase64,
    imageURL,
    urlPreviewImage,
    isDragOver,

    // Actions
    setInputMode,
    handleFileChange,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleRemoveImage,
    handleURLChange,
    handleURLPaste,
    handleClearURL,
    handleModeToggle,
    clearAllImages,

    // Utilities
    formatFileSize,
    hasValidImage,
    getInputImage,
    validateImageURL,
  };
};

export default useImageHandler;

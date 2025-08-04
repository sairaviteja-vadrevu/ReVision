import { useState, useEffect } from "react";
import styled from "styled-components";
import { updateSW } from "../main.jsx";

const InstallPrompt = styled.div`
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  max-width: 40rem;
  width: calc(100% - 4rem);
  background: linear-gradient(135deg, #111 0%, #445069 100%);
  color: white;
  padding: 1.5rem;
  border-radius: 1.2rem;
  box-shadow: 0 0.8rem 2.4rem rgba(0, 0, 0, 0.3);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  animation: slideUp 0.3s ease-out;
  
  @keyframes slideUp {
    from {
      transform: translateX(-50%) translateY(100%);
      opacity: 0;
    }
    to {
      transform: translateX(-50%) translateY(0);
      opacity: 1;
    }
  }
`;

const PromptText = styled.div`
  font-size: 1.4rem;
  line-height: 1.4;
`;

const PromptTitle = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const InstallButton = styled.button`
  flex: 1;
  padding: 1rem 1.5rem;
  font-size: 1.3rem;
  font-weight: 600;
  background: rgba(255, 255, 255, 0.9);
  color: #445069;
  border: none;
  border-radius: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: "Sen", sans-serif;
  
  &:hover {
    background: white;
    transform: translateY(-0.1rem);
  }
`;

const DismissButton = styled.button`
  flex: 1;
  padding: 1rem 1.5rem;
  font-size: 1.3rem;
  font-weight: 600;
  background: transparent;
  color: white;
  border: 0.1rem solid rgba(255, 255, 255, 0.3);
  border-radius: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: "Sen", sans-serif;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const UpdatePrompt = styled.div`
  position: fixed;
  top: 2rem;
  right: 2rem;
  max-width: 30rem;
  background: linear-gradient(135deg, #27ae60, #2ecc71);
  color: white;
  padding: 1.5rem;
  border-radius: 0.8rem;
  box-shadow: 0 0.4rem 1.2rem rgba(0, 0, 0, 0.15);
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

const PWAInstaller = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [showUpdatePrompt, setShowUpdatePrompt] = useState(false);

  useEffect(() => {
    // Handle PWA install prompt
    const handleBeforeInstallPrompt = (e) => {
      console.log("PWA install prompt triggered");
      e.preventDefault();
      setDeferredPrompt(e);
      
      // Don't show immediately, show after user has used the app a bit
      setTimeout(() => {
        setShowInstallPrompt(true);
      }, 30000); // Show after 30 seconds
    };

    // Handle successful installation
    const handleAppInstalled = () => {
      console.log("PWA was installed");
      setShowInstallPrompt(false);
      setDeferredPrompt(null);
    };

    // Handle service worker updates
    const handleSWUpdate = () => {
      console.log("New service worker available");
      setShowUpdatePrompt(true);
      
      // Auto-hide after 10 seconds
      setTimeout(() => {
        setShowUpdatePrompt(false);
      }, 10000);
    };

    // Handle offline ready
    const handleOfflineReady = () => {
      console.log("App is ready to work offline");
      // You can show a notification here if needed
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    window.addEventListener('sw-need-refresh', handleSWUpdate);
    window.addEventListener('sw-offline-ready', handleOfflineReady);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('sw-need-refresh', handleSWUpdate);
      window.removeEventListener('sw-offline-ready', handleOfflineReady);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    try {
      const result = await deferredPrompt.prompt();
      console.log('Install prompt result:', result);
      
      setDeferredPrompt(null);
      setShowInstallPrompt(false);
    } catch (error) {
      console.error('Error showing install prompt:', error);
    }
  };

  const handleDismissInstall = () => {
    setShowInstallPrompt(false);
    // Don't show again for this session
    sessionStorage.setItem('pwa-install-dismissed', 'true');
  };

  const handleUpdateClick = () => {
    setShowUpdatePrompt(false);
    updateSW();
  };

  // Don't show install prompt if already dismissed this session
  const installDismissed = sessionStorage.getItem('pwa-install-dismissed');
  
  return (
    <>
      {showInstallPrompt && !installDismissed && deferredPrompt && (
        <InstallPrompt>
          <PromptTitle>📱 Install ReVision</PromptTitle>
          <PromptText>
            Add ReVision to your home screen for quick access and a better experience!
          </PromptText>
          <ButtonGroup>
            <InstallButton onClick={handleInstallClick}>
              Install App
            </InstallButton>
            <DismissButton onClick={handleDismissInstall}>
              Maybe Later
            </DismissButton>
          </ButtonGroup>
        </InstallPrompt>
      )}

      {showUpdatePrompt && (
        <UpdatePrompt>
          <PromptTitle>🚀 App Updated!</PromptTitle>
          <PromptText>
            A new version is available. Refresh to get the latest features.
          </PromptText>
          <ButtonGroup>
            <InstallButton onClick={handleUpdateClick}>
              Refresh Now
            </InstallButton>
          </ButtonGroup>
        </UpdatePrompt>
      )}
    </>
  );
};

export default PWAInstaller;
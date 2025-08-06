import { useEffect } from "react";
import styled from "styled-components";
import { X, Check } from "lucide-react";
import { useTheme } from "contexts/ThemeContext";

const SidebarOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  z-index: 10000;
  opacity: ${props => props.$isOpen ? 1 : 0};
  visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
  transition: all 0.3s ease;
`;

const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  right: ${props => props.$isOpen ? '0' : '-400px'};
  width: 400px;
  height: 100vh;
  background: white;
  box-shadow: -4px 0 20px rgba(0, 0, 0, 0.1);
  transition: right 0.3s ease;
  z-index: 10001;
  display: flex;
  flex-direction: column;

  @media (max-width: 480px) {
    width: 100vw;
    right: ${props => props.$isOpen ? '0' : '-100vw'};
  }
`;

const SidebarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  border-bottom: 1px solid #e5e5e5;
`;

const SidebarTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
  background: ${props => props.$gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #666;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.2s ease;

  &:hover {
    background: #f5f5f5;
    color: #333;
  }
`;

const SidebarContent = styled.div`
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
`;

const SectionTitle = styled.h3`
  font-size: 1.6rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1.5rem;
`;

const ThemeGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
`;

const ThemeOption = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem;
  border: 2px solid ${props => props.$isSelected ? props.$color : '#e5e5e5'};
  border-radius: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${props => props.$isSelected ? props.$gradient + '15' : 'transparent'};

  &:hover {
    border-color: ${props => props.$color};
    background: ${props => props.$gradient}20;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const ThemePreview = styled.div`
  display: flex;
  width: 60px;
  height: 40px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const ColorBlock = styled.div`
  flex: 1;
  background: ${props => props.$color};
  
  &:first-child {
    flex: 0.4;
  }
`;

const ThemeInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ThemeName = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: #333;
`;

const ThemeDescription = styled.div`
  font-size: 1.2rem;
  color: #666;
`;

const CheckIcon = styled.div`
  color: ${props => props.$color};
  opacity: ${props => props.$isSelected ? 1 : 0};
  transform: scale(${props => props.$isSelected ? 1 : 0.8});
  transition: all 0.2s ease;
`;

const PresetSection = styled.div`
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #e5e5e5;
`;

const PresetGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  gap: 1rem;
`;

const PresetOption = styled.div`
  aspect-ratio: 1;
  border-radius: 12px;
  background: ${props => props.$gradient};
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  border: 3px solid ${props => props.$isSelected ? '#fff' : 'transparent'};
  box-shadow: ${props => props.$isSelected ? `0 0 0 2px ${props.$color}` : '0 2px 8px rgba(0, 0, 0, 0.1)'};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: white;
    opacity: ${props => props.$isSelected ? 1 : 0};
    transition: all 0.2s ease;
  }

  &::before {
    content: '✓';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: ${props => props.$color};
    font-weight: bold;
    font-size: 14px;
    opacity: ${props => props.$isSelected ? 1 : 0};
    transition: all 0.2s ease;
    z-index: 1;
  }
`;

const ThemeSidebar = ({ isOpen, onClose }) => {
  const { currentTheme, themes, changeTheme } = useTheme();

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleThemeSelect = (themeName) => {
    changeTheme(themeName);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <SidebarOverlay $isOpen={isOpen} onClick={handleOverlayClick}>
      <SidebarContainer $isOpen={isOpen}>
        <SidebarHeader>
          <SidebarTitle $gradient={themes[currentTheme].gradient}>
            Choose Theme
          </SidebarTitle>
          <CloseButton onClick={onClose}>
            <X size={24} />
          </CloseButton>
        </SidebarHeader>

        <SidebarContent>
          <SectionTitle>Available Themes</SectionTitle>
          <ThemeGrid>
            {Object.entries(themes).map(([key, theme]) => (
              <ThemeOption
                key={key}
                $isSelected={currentTheme === key}
                $color={theme.color}
                $gradient={theme.gradient}
                onClick={() => handleThemeSelect(key)}
              >
                <ThemePreview>
                  {theme.preview.map((color, index) => (
                    <ColorBlock key={index} $color={color} />
                  ))}
                </ThemePreview>
                <ThemeInfo>
                  <ThemeName>{theme.name}</ThemeName>
                  <ThemeDescription>
                    {key === currentTheme ? 'Currently active' : 'Click to apply'}
                  </ThemeDescription>
                </ThemeInfo>
                <CheckIcon $isSelected={currentTheme === key} $color={theme.color}>
                  <Check size={20} />
                </CheckIcon>
              </ThemeOption>
            ))}
          </ThemeGrid>

          <PresetSection>
            <SectionTitle>Quick Select</SectionTitle>
            <PresetGrid>
              {Object.entries(themes).map(([key, theme]) => (
                <PresetOption
                  key={key}
                  $gradient={theme.gradient}
                  $isSelected={currentTheme === key}
                  $color={theme.color}
                  onClick={() => handleThemeSelect(key)}
                  title={theme.name}
                />
              ))}
            </PresetGrid>
          </PresetSection>
        </SidebarContent>
      </SidebarContainer>
    </SidebarOverlay>
  );
};

export default ThemeSidebar;
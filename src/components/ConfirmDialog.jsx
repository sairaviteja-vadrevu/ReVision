import styled from "styled-components";
import { AlertTriangle } from "lucide-react";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  animation: fadeIn 0.2s ease-out;
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const Dialog = styled.div`
  background: white;
  border-radius: 1.2rem;
  padding: 2.4rem;
  max-width: 42rem;
  width: 90%;
  box-shadow: 0 1rem 2.5rem rgba(0, 0, 0, 0.2);
  animation: slideUp 0.3s ease-out;
  
  @keyframes slideUp {
    from {
      transform: translateY(2rem);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 6rem;
  height: 6rem;
  background: rgba(239, 68, 68, 0.1);
  border-radius: 50%;
  margin: 0 auto 2rem;
  color: #ef4444;
`;

const Title = styled.h3`
  font-size: 2rem;
  font-weight: 700;
  color: #111;
  text-align: center;
  margin-bottom: 1rem;
`;

const Message = styled.p`
  font-size: 1.4rem;
  color: #666;
  text-align: center;
  line-height: 1.6;
  margin-bottom: 2.4rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1.2rem;
  justify-content: center;
`;

const Button = styled.button`
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  font-weight: 600;
  border-radius: 0.8rem;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: "Sen", sans-serif;
  border: none;
  min-width: 10rem;
`;

const CancelButton = styled(Button)`
  background: #f3f4f6;
  color: #374151;
  
  &:hover {
    background: #e5e7eb;
  }
`;

const ConfirmButton = styled(Button)`
  background: #ef4444;
  color: white;
  
  &:hover {
    background: #dc2626;
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ConfirmDialog = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Confirm Action",
  message = "Are you sure you want to proceed?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  loading = false 
}) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Overlay onClick={handleOverlayClick}>
      <Dialog>
        <IconContainer>
          <AlertTriangle size={24} />
        </IconContainer>
        <Title>{title}</Title>
        <Message>{message}</Message>
        <ButtonContainer>
          <CancelButton onClick={onClose} disabled={loading}>
            {cancelText}
          </CancelButton>
          <ConfirmButton onClick={onConfirm} disabled={loading}>
            {loading ? "Processing..." : confirmText}
          </ConfirmButton>
        </ButtonContainer>
      </Dialog>
    </Overlay>
  );
};

export default ConfirmDialog;
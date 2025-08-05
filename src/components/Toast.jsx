import { useState, useEffect } from "react";
import styled from "styled-components";
import { CheckCircle, XCircle, AlertCircle, X } from "lucide-react";

const ToastContainer = styled.div`
  position: fixed;
  top: 2rem;
  right: 2rem;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ToastItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.2rem 1.6rem;
  background: white;
  border-radius: 0.8rem;
  box-shadow: 0 0.4rem 1.2rem rgba(0, 0, 0, 0.15);
  border-left: 0.4rem solid ${props => 
    props.type === 'success' ? '#10b981' :
    props.type === 'error' ? '#ef4444' :
    '#f59e0b'
  };
  min-width: 32rem;
  max-width: 40rem;
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

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  color: ${props => 
    props.type === 'success' ? '#10b981' :
    props.type === 'error' ? '#ef4444' :
    '#f59e0b'
  };
`;

const MessageContainer = styled.div`
  flex: 1;
`;

const ToastTitle = styled.div`
  font-weight: 600;
  font-size: 1.4rem;
  color: #111;
  margin-bottom: 0.2rem;
`;

const ToastMessage = styled.div`
  font-size: 1.3rem;
  color: #666;
  line-height: 1.4;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  padding: 0.2rem;
  border-radius: 0.2rem;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(0, 0, 0, 0.05);
    color: #333;
  }
`;

const Toast = ({ toasts, removeToast }) => {
  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle size={20} />;
      case 'error':
        return <XCircle size={20} />;
      default:
        return <AlertCircle size={20} />;
    }
  };

  return (
    <ToastContainer>
      {toasts.map((toast) => (
        <ToastItem key={toast.id} type={toast.type}>
          <IconContainer type={toast.type}>
            {getIcon(toast.type)}
          </IconContainer>
          <MessageContainer>
            {toast.title && <ToastTitle>{toast.title}</ToastTitle>}
            <ToastMessage>{toast.message}</ToastMessage>
          </MessageContainer>
          <CloseButton onClick={() => removeToast(toast.id)}>
            <X size={16} />
          </CloseButton>
        </ToastItem>
      ))}
    </ToastContainer>
  );
};

export const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const addToast = ({ type = 'info', title, message, duration = 5000 }) => {
    const id = Date.now() + Math.random();
    const newToast = { id, type, title, message };
    
    setToasts(prev => [...prev, newToast]);
    
    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
    
    return id;
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const showSuccess = (message, title = 'Success') => 
    addToast({ type: 'success', title, message });
  
  const showError = (message, title = 'Error') => 
    addToast({ type: 'error', title, message });
  
  const showInfo = (message, title = 'Info') => 
    addToast({ type: 'info', title, message });

  return {
    toasts,
    addToast,
    removeToast,
    showSuccess,
    showError,
    showInfo,
  };
};

export default Toast;
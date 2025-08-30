// src/components/AuthModal.tsx
import React from "react";
import AuthModalContent from "./AuthModal/index";

type AuthModalProps = {
  isOpen?: boolean;
  onClose?: () => void;
  onAuth?: (userData: any) => void;
  referralCode?: string;
};

const AuthModal: React.FC<AuthModalProps> = (props) => {
  // keep this file as the public entry so other parts of your app don't need to change imports
  return <AuthModalContent {...props} />;
};

export default AuthModal;

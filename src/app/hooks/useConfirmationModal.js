// hooks/useConfirmationModal.js
import { useState } from 'react';

export const useConfirmationModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalProps, setModalProps] = useState({ title: '', description: '', onConfirm: null, cautionNote: '', showConfirmCheckbox: false });

  const openModal = ({ title, description, onConfirm, cautionNote, showConfirmCheckbox }) => {
    setModalProps({ title, description, onConfirm, cautionNote, showConfirmCheckbox });
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleConfirm = () => {
    if (modalProps.onConfirm) {
      modalProps.onConfirm();
    }
    closeModal();
  };

  return {
    isOpen,
    openModal,
    closeModal,
    handleConfirm,
    modalProps,
  };
};

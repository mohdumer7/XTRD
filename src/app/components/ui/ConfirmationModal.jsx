// components/ConfirmationModal.js
import React, { useState } from 'react';

const ConfirmationModal = ({ isOpen, title, description, onConfirm, onCancel, cautionNote, showConfirmCheckbox }) => {
  const [isConfirmed, setIsConfirmed] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (showConfirmCheckbox && !isConfirmed) {
      return;
    }
    onConfirm();
  };

  return (
    <div className="fixed inset-0 z-50 text-black flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-3/5">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p className="mb-4">{description}</p>
        
        {cautionNote && (
          <p className="text-red-500 mb-4">{cautionNote}</p>
        )}
        {showConfirmCheckbox && (
          <div className="mb-4">
            <input
              type="checkbox"
              id="confirm"
              className='bg-grey-700'
              checked={isConfirmed}
              onChange={(e) => setIsConfirmed(e.target.checked)}
            />
            <label htmlFor="confirm" className="ml-2">I have read and understood the above information</label>
          </div>
        )}
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-900"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className={`px-4 py-2 rounded ${showConfirmCheckbox && !isConfirmed ? 'bg-gray-300' : 'bg-purple-600 text-white hover:bg-purple-700'}`}
            disabled={showConfirmCheckbox && !isConfirmed}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;

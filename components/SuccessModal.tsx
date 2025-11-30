// components/SuccessModal.tsx
'use client';

import React from 'react';
import { CheckCircle, X } from 'lucide-react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ 
  isOpen, 
  onClose, 
  title = "Gửi yêu cầu thành công!", 
  message = "Vui lòng đợi thông báo sau." 
}) => {
  
  // Nếu không mở, không render gì cả
  if (!isOpen) return null;

  return (
    // Lớp phủ (Overlay)
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50 transition-opacity duration-300">
      
      {/* Nội dung Modal */}
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-xs text-center relative transform transition-all scale-100 opacity-100">
        
        {/* Nút đóng (X) */}
        <button 
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon Check */}
        <div className="mx-auto mb-4">
          {/* Bạn có thể dùng ảnh động (GIF) hoặc SVG động ở đây */}
          <CheckCircle className="w-16 h-16 text-green-500" />
        </div>

        {/* Nội dung Text */}
        <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-500">{message}</p>
        
      </div>
    </div>
  );
};

export default SuccessModal;
// components/SendNotificationModal.tsx
'use client';

import React from 'react';
import { X } from 'lucide-react';

interface SendNotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseName?: string;
}

const SendNotificationModal: React.FC<SendNotificationModalProps> = ({ 
  isOpen, 
  onClose, 
  courseName = "Công nghệ Phần mềm (CO3001)" 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg relative">
        <button 
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          <X className="w-5 h-5 cursor-pointer" />
        </button>

        <h2 className="text-xl font-semibold mb-2">Gửi thông báo cho lớp học</h2>
        <p className="text-sm text-gray-500 mb-6">Gửi thông báo tới tất cả sinh viên trong lớp {courseName}</p>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Tiêu đề thông báo <span className="text-red-500">*</span></label>
            <input 
              type="text" 
              placeholder="VD: Thay đổi lịch học tuần sau" 
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Nội dung</label>
            <textarea 
              placeholder="Nhập nội dung thông báo..." 
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md min-h-[100px]"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Mức độ ưu tiên <span className="text-red-500">*</span></label>
            <select className="mt-1 block w-full p-2 border border-gray-300 rounded-md cursor-pointer">
                <option value="urgent" className="text-red-600">Khẩn cấp</option>
                <option value="normal">Bình thường</option>
            </select>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 cursor-pointer"
            >
              Hủy
            </button>
            <button 
              type="submit"
              className="px-4 py-2 bg-[#4BA4E3] text-white rounded-md hover:bg-[#227FC2] cursor-pointer"
            >
              Gửi thông báo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SendNotificationModal;
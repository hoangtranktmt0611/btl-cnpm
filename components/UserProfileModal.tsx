// components/UserProfileModal.tsx
'use client';

import React from 'react';
import { X, Send, User } from 'lucide-react';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  // Bạn nên truyền dữ liệu người dùng vào đây
  // user: UserData; 
}

// Dữ liệu mock
const MOCK_USER = {
    name: 'Nguyễn Văn A',
    status: 'Đang hoạt động',
    mssv: '2311199',
    email: 'nguyenvana@hcmut.edu.vn',
    country: 'Việt Nam',
    city: 'HCM',
    timezone: 'Asia/Ho_Chi_Minh'
};

const UserProfileModal: React.FC<UserProfileModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    // Lớp phủ (Overlay)
    <div className="fixed inset-0 bg-gray-800 bg-opacity-60 flex items-center justify-center z-50">
      {/* Nội dung Modal */}
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-sm text-center relative">
        
        {/* Nút đóng (X) */}
        <button 
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-lg font-semibold text-gray-800 mb-4">Hồ sơ người dùng</h2>
        <p className="text-sm text-gray-500 mb-6">Thông tin chi tiết về sinh viên</p>

        {/* Avatar */}
        <div className="mb-4">
            <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto flex items-center justify-center">
                <User className="w-12 h-12 text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold mt-3">{MOCK_USER.name}</h3>
            <span className="text-sm text-green-500">{MOCK_USER.status}</span>
        </div>

        {/* Thông tin chi tiết */}
        <div className="text-left space-y-3 text-sm">
            <div className="flex justify-between">
                <span className="text-gray-500">MSSV</span>
                <span className="font-medium text-gray-800">{MOCK_USER.mssv}</span>
            </div>
            <div className="flex justify-between">
                <span className="text-gray-500">Email</span>
                <span className="font-medium text-gray-800">{MOCK_USER.email}</span>
            </div>
            <div className="flex justify-between">
                <span className="text-gray-500">Quốc Gia</span>
                <span className="font-medium text-gray-800">{MOCK_USER.country}</span>
            </div>
             <div className="flex justify-between">
                <span className="text-gray-500">Tỉnh/Thành Phố</span>
                <span className="font-medium text-gray-800">{MOCK_USER.city}</span>
            </div>
             <div className="flex justify-between">
                <span className="text-gray-500">Múi giờ</span>
                <span className="font-medium text-gray-800">{MOCK_USER.timezone}</span>
            </div>
        </div>

        {/* Nút bấm */}
        <div className="mt-8 flex space-x-3">
            <button 
                onClick={onClose}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 font-medium rounded-md hover:bg-gray-300 transition"
            >
                Đóng
            </button>
            <button 
                onClick={onClose} // Tạm thời chỉ đóng
                className="flex-1 px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition flex items-center justify-center space-x-2"
            >
                <Send className="w-4 h-4" />
                <span>Gửi tin nhắn</span>
            </button>
        </div>

      </div>
    </div>
  );
};

export default UserProfileModal;
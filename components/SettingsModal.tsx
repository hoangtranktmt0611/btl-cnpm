// components/SettingsModal.tsx
'use client';

import React, { useState } from 'react';
import { X, User, Info, Lock, Bell, Upload } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

//--- Các component Tab con ---

// Tab 1: Hồ sơ
const ProfileTab: React.FC = () => (
    <div className="space-y-4">
        <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl">
                BK
            </div>
            <button className="flex items-center space-x-1 text-sm text-blue-600 hover:underline">
                <Upload className="w-4 h-4" />
                <span>Tải ảnh lên</span>
            </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Họ và tên đệm</label>
                <input type="text" defaultValue="Nguyễn" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Tên</label>
                <input type="text" defaultValue="Yatzilín" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
            </div>
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input type="text" defaultValue="yatzilín" className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-50" readOnly />
        </div>
         <div>
            <label className="block text-sm font-medium text-gray-700">Tiểu sử</label>
            <textarea placeholder="Hãy viết về bản thân bạn" className="mt-1 block w-full p-2 border border-gray-300 rounded-md min-h-[80px]"></textarea>
        </div>
         <div>
            <label className="block text-sm font-medium text-gray-700">Địa chỉ thường trú</label>
            <input type="text" placeholder="..." className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700">Lớp</label>
            <input type="text" placeholder="..." className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
        </div>
    </div>
);

// Tab 2: Thông tin
const InfoTab: React.FC = () => (
    <div className="space-y-4">
        <div>
            <label className="block text-sm font-medium text-gray-700">Địa chỉ thư điện tử</label>
            <input type="email" defaultValue="yatzilin.nguyen@yatzilin.site" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700">Số điện thoại</label>
            <input type="tel" defaultValue="+84 232323232" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700">Ngôn ngữ</label>
            <select defaultValue="Tiếng Việt" className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
                <option>Tiếng Việt</option>
                <option>English</option>
            </select>
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700">Múi giờ</label>
            <select defaultValue="Asia/Ho_Chi_Minh" className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
                <option>Asia/Ho_Chi_Minh</option>
                <option>UTC</option>
            </select>
        </div>
    </div>
);

// Tab 3: Bảo mật
const SecurityTab: React.FC = () => (
    <div className="space-y-6">
        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
            <div>
                <h4 className="font-medium">Xác minh hai bước</h4>
                <p className="text-sm text-gray-500">Thêm một lớp bảo mật khi đăng nhập</p>
            </div>
            <div className="w-12 h-6 bg-gray-300 rounded-full p-1 cursor-pointer flex items-center">
                 <div className="w-4 h-4 bg-white rounded-full shadow-md"></div>
            </div>
        </div>
        <div>
            <h4 className="font-medium mb-3">Các phiên đang hoạt động</h4>
            <div className="space-y-3">
                <div className="flex justify-between items-center">
                    <div>
                        <p className="font-medium">MacBook Pro - Chrome</p>
                        <p className="text-sm text-gray-500">San Francisco, CA • Phiên hiện tại</p>
                    </div>
                    <span className="text-sm text-blue-600">Thiết bị hiện tại</span>
                </div>
                <div className="flex justify-between items-center">
                    <div>
                        <p className="font-medium">iPhone 14 - Safari</p>
                        <p className="text-sm text-gray-500">San Francisco, CA • 2 tiếng trước</p>
                    </div>
                    <button className="text-sm text-red-600 hover:underline">Đăng xuất</button>
                </div>
            </div>
        </div>
    </div>
);

// Tab 4: Thông báo
const NotificationTab: React.FC = () => (
    <div className="space-y-6">
         <h4 className="font-medium">Cách thức thông báo</h4>
         <div className="flex justify-between items-center">
            <div>
                <p className="font-medium">Thông báo qua thư điện tử</p>
                <p className="text-sm text-gray-500">Nhận email cập nhật và lịch sử đăng nhập</p>
            </div>
             <div className="w-12 h-6 bg-gray-300 rounded-full p-1 cursor-pointer flex items-center">
                 <div className="w-4 h-4 bg-white rounded-full shadow-md"></div>
            </div>
        </div>
         <div className="flex justify-between items-center">
            <div>
                <p className="font-medium">Thông báo đẩy</p>
                <p className="text-sm text-gray-500">Nhận thông báo đẩy trên thiết bị của bạn</p>
            </div>
             <div className="w-12 h-6 bg-gray-300 rounded-full p-1 cursor-pointer flex items-center">
                 <div className="w-4 h-4 bg-white rounded-full shadow-md"></div>
            </div>
        </div>
        
        <h4 className="font-medium pt-4 border-t">Loại thông báo</h4>
         <div className="flex justify-between items-center">
            <div>
                <p className="font-medium">Hoạt động tài khoản</p>
                <p className="text-sm text-gray-500">Cập nhật về bảo mật và lịch sử đăng nhập</p>
            </div>
             <div className="w-12 h-6 bg-gray-300 rounded-full p-1 cursor-pointer flex items-center">
                 <div className="w-4 h-4 bg-white rounded-full shadow-md"></div>
            </div>
        </div>
         <div className="flex justify-between items-center">
            <div>
                <p className="font-medium">Tổng kết tuần</p>
                <p className="text-sm text-gray-500">Nhận bản tóm tắt hàng tuần về hoạt động</p>
            </div>
             <div className="w-12 h-6 bg-gray-300 rounded-full p-1 cursor-pointer flex items-center">
                 <div className="w-4 h-4 bg-white rounded-full shadow-md"></div>
            </div>
        </div>
    </div>
);


// --- Component Modal Chính ---
const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('profile'); // 'profile', 'info', 'security', 'notification'

  if (!isOpen) return null;

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileTab />;
      case 'info':
        return <InfoTab />;
      case 'security':
        return <SecurityTab />;
      case 'notification':
        return <NotificationTab />;
      default:
        return <ProfileTab />;
    }
  };

  const TabButton: React.FC<{ name: string; label: string; icon: React.ElementType }> = ({ name, label, icon: Icon }) => (
    <button
        onClick={() => setActiveTab(name)}
        className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium ${
            activeTab === name
            ? 'bg-blue-100 text-blue-700'
            : 'text-gray-600 hover:bg-gray-100'
        }`}
    >
        <Icon className="w-4 h-4" />
        <span>{label}</span>
    </button>
  );

  return (
    // Lớp phủ
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50 p-4">
      {/* Nội dung Modal */}
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* Header Modal */}
        <div className="p-4 border-b flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Cài đặt thông tin</h2>
            <p className="text-sm text-gray-500">Quản lý thông tin và tuỳ chọn</p>
          </div>
          <button 
            className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="p-4 border-b">
            <div className="flex space-x-2">
                <TabButton name="profile" label="Hồ sơ" icon={User} />
                <TabButton name="info" label="Thông tin" icon={Info} />
                <TabButton name="security" label="Bảo mật" icon={Lock} />
                <TabButton name="notification" label="Thông báo" icon={Bell} />
            </div>
        </div>

        {/* Nội dung Tab */}
        <div className="p-6 overflow-y-auto">
            {renderTabContent()}
        </div>

        {/* Footer (Nút bấm) */}
        <div className="p-4 border-t bg-gray-50 flex justify-end space-x-3">
             <button
                onClick={onClose}
                className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
            >
                Cancel
            </button>
            <button
                onClick={onClose} // Tạm thời
                className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700"
            >
                Save Changes
            </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
// components/AddScheduleModal.tsx
'use client';

import React from 'react';
import { X } from 'lucide-react';

interface AddScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddScheduleModal: React.FC<AddScheduleModalProps> = ({ isOpen, onClose }) => {
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

        <h2 className="text-xl font-semibold mb-2">Thiết lập lịch hẹn</h2>
        <p className="text-sm text-gray-500 mb-6">Nhập thông tin để tạo lịch học mới hoặc buổi tư vấn</p>

        <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Ngày học <span className="text-red-500">*</span></label>
                    <input type="date" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Giờ bắt đầu <span className="text-red-500">*</span></label>
                    <input type="time" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                </div>
            </div>
             <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Hình thức học <span className="text-red-500">*</span></label>
                    <select className="mt-1 block w-full p-2 border border-gray-300 rounded-md cursor-pointer">
                        <option>Online</option>
                        <option>Offline</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Thời lượng (phút) <span className="text-red-500">*</span></label>
                    <select className="mt-1 block w-full p-2 border border-gray-300 rounded-md cursor-pointer">
                        <option>60 phút</option>
                        <option>90 phút</option>
                        <option>120 phút</option>
                    </select>
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Tiêu đề <span className="text-red-500">*</span></label>
                <input type="text" placeholder="VD: Lớp toán cao cấp, Buổi tư vấn học tập..." className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
            </div>
             <div>
                <label className="block text-sm font-medium text-gray-700">Mô tả</label>
                <textarea placeholder="Nhập mô tả chi tiết về buổi học..." className="mt-1 block w-full p-2 border border-gray-300 rounded-md min-h-[80px]"></textarea>
            </div>
            <div className="flex justify-end space-x-3 pt-4">
                <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 cursor-pointer">
                    Hủy
                </button>
                <button type="submit" className="px-4 py-2 bg-[#4BA4E3] text-white rounded-md hover:bg-[#227FC2] cursor-pointer">
                    Xác nhận
                </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default AddScheduleModal;
// components/CreateClassModal.tsx
'use client';

import React from 'react';
import { X, BookOpen, CircleUser, Users, Calendar, Hash, Circle } from 'lucide-react';

interface CreateClassModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateClassModal: React.FC<CreateClassModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative">
        <button 
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-semibold mb-2">Tạo lớp học mới</h2>
        <p className="text-sm text-gray-500 mb-6">Nhập thông tin lớp học để đăng ký</p>

        <form className="space-y-4">
          <div>
            <div className="flex items-center space-x-2">
              <Hash className="text-gray-700" size={16}/>
              <label className="block text-sm font-semibold text-gray-700">Mã môn học <span className="text-red-500">*</span></label>
            </div>
            <input 
              type="text" 
              placeholder="VD: MATH301" 
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md" 
            />            
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <BookOpen className="text-gray-700" size={16}/>
              <label className="block text-sm font-semibold text-gray-700">Tên môn học <span className="text-red-500">*</span></label>
            </div>
            <input 
              type="text" 
              placeholder="VD: Toán Cao Cấp A" 
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md" 
            />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <CircleUser className="text-gray-700" size={16}/>
              <label className="block text-sm font-semibold text-gray-700">Giảng viên <span className="text-red-500">*</span></label>
            </div>
            <input 
              type="text" 
              value="Yatzilín" 
              readOnly 
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-100" 
            />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <Users className="text-gray-700" size={16}/>
              <label className="block text-sm font-semibold text-gray-700">Sĩ số <span className="text-red-500">*</span></label>
            </div>
            <input 
              type="number" 
              placeholder="VD: 50" 
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md" 
            />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <Calendar className="text-gray-700" size={16}/>
              <label className="block text-sm font-semibold text-gray-700">Học kỳ <span className="text-red-500">*</span></label>
            </div>
            <input 
              type="text" 
              placeholder="VD: HK1 2024-2025" 
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md" 
            />
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
              Tạo lớp học
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateClassModal;
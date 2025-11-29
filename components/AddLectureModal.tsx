// components/AddLectureModal.tsx
'use client';

import React from 'react';
import { X } from 'lucide-react';

interface AddLectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddLectureModal: React.FC<AddLectureModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-[10px] shadow-xl p-6 w-full max-w-lg relative">
        <button 
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          <X className="w-5 h-5 cursor-pointer" />
        </button>

        <h2 className="text-xl font-semibold mb-2">Thêm bài giảng/tài liệu mới</h2>
        <p className="text-sm text-gray-500 mb-6">Thêm tài liệu học tập mới cho lớp học của bạn</p>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Tiêu đề <span className="text-red-500">*</span></label>
            <input 
              type="text" 
              placeholder="VD: Chương 1: Giới thiệu về..." 
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Mô tả</label>
            <textarea 
              placeholder="Mô tả ngắn về tài liệu..." 
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md min-h-[80px]"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Loại tài liệu <span className="text-red-500">*</span></label>
            <select className="mt-1 block w-full p-2 border border-gray-300 rounded-md cursor-pointer">
                <option>PDF Document</option>
                <option>Video Link</option>
                <option>External Link</option>
                <option>File nén (.zip, .rar)</option>
            </select>
          </div>
          <div>
             <label className="block text-sm font-medium text-gray-700">Tải lên tài liệu</label>
             <input 
                type="file"
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-[#4BA4E3] file:text-sm file:font-semibold file:bg-white file:text-[#4BA4E3] hover:file:bg-[#EBF7FF] file:cursor-pointer"
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
              Thêm tài liệu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLectureModal;
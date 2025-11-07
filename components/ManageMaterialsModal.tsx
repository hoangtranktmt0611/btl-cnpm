// components/ManageMaterialsModal.tsx
'use client';

import React from 'react';
import { X, Plus, Edit, Trash2, FileText, PlayCircle, Link as LinkIcon } from 'lucide-react';

interface ManageMaterialsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddNew: () => void; // Hàm để mở modal AddLectureModal
}

// Dữ liệu mock
const LECTURE_DATA = [
    { type: 'file', title: 'Chương 1: Giới thiệu về Color Styles', desc: 'Tài liệu giới thiệu cơ bản...', icon: FileText, tag: 'PDF' },
    { type: 'video', title: 'Video bài giảng: Design Principles', desc: 'Video hướng dẫn...', icon: PlayCircle, tag: 'VIDEO' },
    { type: 'link', title: 'Tài liệu tham khảo: UI Components', desc: 'Bộ tài liệu...', icon: LinkIcon, tag: 'LINK' },
    { type: 'file', title: 'Chương 3: Layout và Spacing', desc: 'Tài liệu...', icon: FileText, tag: 'PDF' },
];

const ManageMaterialsModal: React.FC<ManageMaterialsModalProps> = ({ isOpen, onClose, onAddNew }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col">
        <button 
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="p-6 border-b">
            <h2 className="text-xl font-semibold mb-2">Quản lý tài liệu</h2>
            <p className="text-sm text-gray-500">Xem và quản lý tất cả tài liệu học tập của lớp</p>
        </div>

        <div className="flex justify-between items-center p-4">
            <span className="text-sm text-gray-500">{LECTURE_DATA.length} tài liệu</span>
            <button 
                onClick={onAddNew}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md text-sm shadow-sm hover:bg-blue-700"
            >
                <Plus className="w-4 h-4 mr-1" /> Thêm mới
            </button>
        </div>

        {/* Bảng Tài liệu */}
        <div className="overflow-y-auto px-6">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">Tài liệu</th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">Loại</th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">Hành động</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {LECTURE_DATA.map((item, index) => (
                        <tr key={index}>
                            <td className="py-4 px-4">
                                <div className="flex items-center space-x-3">
                                    <item.icon className="w-5 h-5 text-gray-400 shrink-0" />
                                    <div>
                                        <p className="font-medium text-gray-900">{item.title}</p>
                                        <p className="text-sm text-gray-500 truncate max-w-xs">{item.desc}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="py-4 px-4">
                                <span className={`text-xs px-2 py-0.5 rounded font-medium ${
                                    item.tag === 'PDF' ? 'bg-red-100 text-red-700' : 
                                    item.tag === 'VIDEO' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                                }`}>
                                    {item.tag}
                                </span>
                            </td>
                            <td className="py-4 px-4">
                                <div className="flex space-x-2">
                                    <button className="text-gray-500 hover:text-blue-600"><Edit className="w-4 h-4" /></button>
                                    <button className="text-gray-500 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        <div className="p-4 border-t bg-gray-50 flex justify-end">
             <button
                onClick={onClose}
                className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
            >
                Đóng
            </button>
        </div>
      </div>
    </div>
  );
};

export default ManageMaterialsModal;
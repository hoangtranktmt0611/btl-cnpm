// components/ManageMaterialsModal.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { X, Plus, Edit, Trash2, FileText, PlayCircle, Link as LinkIcon } from 'lucide-react';
import { useParams } from 'next/navigation';


interface ManageMaterialsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddNew: () => void; // Hàm để mở modal AddLectureModal
}

const ManageMaterialsModal: React.FC<ManageMaterialsModalProps> = ({ isOpen, onClose, onAddNew }) => {
  const params = useParams();
  const [lectureData, setLectureData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen || !params?.classId) return;

    setLoading(true);
    fetch(`/api/Tutor/my-classes/${params.classId}`)
      .then((res) => res.json())
      .then((json) => {
        setLectureData(json?.lecture || []);
      })
      .catch(() => setLectureData([]))
      .finally(() => setLoading(false));
  }, [isOpen, params?.classId]);

  if (!isOpen) return null;
  

  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col">
        <button 
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="p-6">
            <h2 className="text-xl font-semibold mb-2">Quản lý tài liệu</h2>
            <p className="text-sm text-gray-500">Xem và quản lý tất cả tài liệu học tập của lớp</p>
        </div>

        <div className="flex justify-between items-center p-4">
            <span className="text-sm text-gray-500">{lectureData.length} tài liệu</span>
            <button 
                onClick={onAddNew}
                className="flex items-center px-3 py-1 bg-[#4BA4E3] text-white rounded-md hover:bg-[#227FC2] cursor-pointer"
            >
                <Plus className="w-4 h-4 mr-1" /> Thêm mới
            </button>
        </div>

        {/* Bảng Tài liệu */}
        <div className="overflow-y-auto px-4">
            <table className="min-w-full divide-y divide-gray-200 rounded-[10px] shadow-[0_0_3px_rgba(0,0,0,0.2)]">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="py-3 px-4 text-left text-sm font-bold text-gray-500 uppercase">Tài liệu</th>
                        <th className="py-3 px-4 text-center text-sm font-bold text-gray-500 uppercase">Loại</th>
                        <th className="py-3 px-4 text-center text-sm font-bold text-gray-500 uppercase">Hành động</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {lectureData.map((item, index) => {
                        let IconComponent = FileText;
                        let iconColor = 'text-[#2B7FFF]';
                        if (item.type === 'video') {
                            IconComponent = PlayCircle;
                            iconColor = 'text-[#FF6900]';
                        } else if (item.type === 'link') {
                            IconComponent = LinkIcon;
                            iconColor = 'text-[#B215AD]';
                        }
                        return (
                            <tr key={index}>
                                <td className="py-4 px-4">
                                    <div className="flex items-center space-x-3">
                                        <IconComponent className={`w-6 h-6 ${iconColor} shrink-0`} />      
                                        <div>
                                            <p className="font-medium text-gray-900">{item.title}</p>
                                            <p className="text-sm text-gray-500 truncate max-w-xs">{item.desc}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-4 px-4">
                                    <div className="flex items-center justify-center">
                                        <span className={"text-xs px-2 py-1 rounded-[5px] font-semibold uppercase bg-blue-100 text-blue-700"}>
                                            {item.type}
                                        </span>
                                    </div>
                                </td>
                                <td className="py-4 px-4">
                                    <div className="flex justify-center space-x-8">
                                        <button className="text-gray-500 hover:text-blue-600 cursor-pointer"><Edit size={20} /></button>
                                        <button className="text-gray-500 hover:text-red-600 cursor-pointer"><Trash2 size={20} /></button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>

        <div className="p-4 bg-gray-50 flex justify-end">
             <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 cursor-pointer"
            >
                Đóng
            </button>
        </div>
      </div>
    </div>
  );
};

export default ManageMaterialsModal;
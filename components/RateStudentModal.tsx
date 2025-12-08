//components/RateStudentModal.tsx

'use client';

import React, { useState } from 'react';
import { X, Star } from 'lucide-react';

interface RateStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: any; // Thông tin sinh viên đang được đánh giá
}

const RateStudentModal: React.FC<RateStudentModalProps> = ({ isOpen, onClose, student }) => {
  const [rating, setRating] = useState(0);
  const [participationScore, setParticipationScore] = useState('');
  const [interactionScore, setInteractionScore] = useState('');
  const [comment, setComment] = useState('');

  if (!isOpen) return null;

  // Tính toán điểm tổng kết (Demo logic)
  const totalScore = ((Number(participationScore || 0) + Number(interactionScore || 0)) / 2).toFixed(1);

  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50 p-4 font-sans">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg relative flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex justify-between items-start p-6 border-b border-gray-100">
            <div>
                <h2 className="text-xl font-bold text-gray-800">Đánh giá sinh viên</h2>
                <p className="text-sm text-gray-500 mt-1">
                    Đánh giá cho sinh viên: <span className="font-bold text-black">{student?.name || 'Unknown'}</span>
                </p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
            </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5 overflow-y-auto">
            {/* Đánh giá tổng quan (Stars) */}
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                    Đánh giá tổng quan <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button key={star} onClick={() => setRating(star)} className="focus:outline-none">
                            <Star 
                                className={`w-8 h-8 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                            />
                        </button>
                    ))}
                    <span className="text-sm text-gray-500 ml-2">{rating > 0 ? '' : 'Chưa chọn'}</span>
                </div>
            </div>

            {/* Tiêu chí đánh giá */}
            <div className="space-y-4">
                <p className="text-sm font-bold text-gray-700">Tiêu chí đánh giá <span className="text-red-500">*</span></p>
                
                <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-600">Tham gia lớp học</label>
                    <div className="flex items-center">
                        <input 
                            type="number" 
                            max={10} min={0}
                            value={participationScore}
                            onChange={(e) => setParticipationScore(e.target.value)}
                            className="w-16 p-2 border border-gray-300 rounded-md text-center focus:border-blue-500 outline-none"
                        />
                        <span className="ml-2 text-sm text-gray-500">/ 10 điểm</span>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-600">Tương tác và đóng góp</label>
                    <div className="flex items-center">
                        <input 
                            type="number" 
                            max={10} min={0}
                            value={interactionScore}
                            onChange={(e) => setInteractionScore(e.target.value)}
                            className="w-16 p-2 border border-gray-300 rounded-md text-center focus:border-blue-500 outline-none"
                        />
                        <span className="ml-2 text-sm text-gray-500">/ 10 điểm</span>
                    </div>
                </div>
            </div>

            {/* Nhận xét */}
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                    Nhận xét <span className="text-red-500">*</span>
                </label>
                <textarea 
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Nhập nhận xét chi tiết về sinh viên..."
                    className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 min-h-[100px] focus:bg-white focus:border-blue-500 outline-none resize-none"
                ></textarea>
            </div>

            {/* Tổng kết (Box xám nhạt dưới cùng) */}
            <div className="bg-gray-50 p-4 rounded-lg flex flex-col space-y-2">
                <h4 className="text-sm font-bold text-gray-800">Tổng kết đánh giá</h4>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Sinh viên: <b>{student?.name}</b></span>
                    <span className="text-gray-600">Tiến độ: <b>{totalScore}/10</b></span>
                </div>
                <div className="text-sm text-gray-600">
                    Đánh giá: <b>{rating > 0 ? `${rating} sao` : 'Chưa chọn'}</b>
                </div>
            </div>
        </div>

        {/* Footer Buttons */}
        <div className="p-4 border-t border-gray-100 flex justify-end space-x-3">
            <button 
                onClick={onClose}
                className="px-6 py-2 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50"
            >
                Hủy
            </button>
            <button 
                onClick={() => {
                    console.log({ studentId: student?.id, rating, participationScore, interactionScore, comment });
                    onClose();
                    alert("Lưu đánh giá thành công!");
                }}
                className="px-6 py-2 bg-[#4BA4E3] text-white font-medium rounded-lg hover:bg-[#227FC2] shadow-sm"
            >
                Lưu đánh giá
            </button>
        </div>
      </div>
    </div>
  );
};

export default RateStudentModal;
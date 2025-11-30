// components/RegistrationForm.tsx
'use client';

import React, { useState } from 'react';
// Đảm bảo bạn đã tạo file /types/index.ts
import { Course, RegistrationData } from '@/types'; 
import SuccessModal from '@/components/SuccessModal'; // <-- 1. IMPORT MODAL

// Dữ liệu mock
const MOCK_COURSES: Course[] = [
  { id: 1, name: 'Môn học 1' },
  { id: 2, name: 'Môn học 2' },
  { id: 3, name: 'Môn học 3' },
  { id: 4, name: 'Môn học 4' },
];

const initialData: RegistrationData = {
  courses: [1], 
  skillImprovement: '',
  supportNeeds: '',
};

const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<RegistrationData>(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false); // <-- 2. THÊM STATE ĐỂ QUẢN LÝ MODAL

  const handleCourseChange = (courseId: number) => {
    setFormData(prev => {
      const isSelected = prev.courses.includes(courseId);
      return {
        ...prev,
        courses: isSelected 
          ? prev.courses.filter(id => id !== courseId)
          : [...prev.courses, courseId],
      };
    });
  };

  const handleSave = () => {
    console.log('Dữ liệu đăng ký đã lưu:', formData);
    // 3. MỞ MODAL thay vì dùng alert()
    setIsModalOpen(true); 
    // alert("Gửi yêu cầu thành công!"); // Xóa dòng alert() cũ
  };

  const handleCancel = () => {
    setFormData(initialData);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Component con: Header Form
  const FormHeader = () => (
    <div className="bg-white border-t-[25px] border-[#003DA5] shadow-[0_4px_3px_rgba(0,0,0,0.2)] rounded-xl px-6 py-3  mb-2">
      <h2 className="text-[35px] font-bold text-[#003DA5]">Form đăng ký</h2>
      <p className="text-sm mt-1 text-[#4BA4E3] mb-5">Sinh viên điền thông tin và nhu cầu để đăng ký tham gia chương trình</p>
    </div>
  );

  // Component con: Khối Form
  const FormBlock: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-white border-l-[15px] border-[#4BA4E3] shadow-[0_4px_3px_rgba(0,0,0,0.2)] rounded-xl p-4 space-y-2">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="text-gray-700">
        {children}
      </div>
    </div>
  );

  return (
    <>
      {/* 4. RENDER MODAL (Nó sẽ tự ẩn/hiện dựa trên state 'isModalOpen') */}
      <SuccessModal isOpen={isModalOpen} onClose={handleCloseModal} />

      <div className="mt-3 w-full max-w-3xl mx-auto space-y-5">
        <FormHeader />

        <div className="mt-5 space-y-5">
          
          <FormBlock title="Nhu cầu hỗ trợ">
            <textarea
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 min-h-[100px]"
              placeholder="Mô tả tóm tắt nhu cầu hỗ trợ của bạn..."
              value={formData.supportNeeds}
              onChange={(e) => setFormData({...formData, supportNeeds: e.target.value})}
            />
          </FormBlock>

          <FormBlock title="Môn học">
            {MOCK_COURSES.map((course) => (
              <div key={course.id} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={`course-${course.id}`}
                  checked={formData.courses.includes(course.id)}
                  onChange={() => handleCourseChange(course.id)}
                  className="form-checkbox h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <label htmlFor={`course-${course.id}`} className="ml-3 text-sm font-medium text-gray-700">
                  {course.name}
                </label>
              </div>
            ))}
          </FormBlock>

          <FormBlock title="Kỹ năng muốn cải thiện">
            <textarea
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 min-h-[100px]"
              placeholder="Liệt kê các kỹ năng bạn muốn cải thiện..."
              value={formData.skillImprovement}
              onChange={(e) => setFormData({...formData, skillImprovement: e.target.value})}
            />
          </FormBlock>

          <div className="flex justify-end space-x-3 pt-6 mt-6">
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-[#4BA4E3] text-white font-medium rounded-md shadow-sm hover:bg-blue-700 transition"
            >
              Save Changes
            </button>
            <button
              onClick={handleCancel}
              className="px-6 py-2 bg-red-600 text-white font-medium rounded-md shadow-sm hover:bg-red-700 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegistrationForm;
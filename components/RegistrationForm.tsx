// components/RegistrationForm.tsx
'use client';

import React, { useState } from 'react';
import { Course, RegistrationData } from '@/types';
import SuccessModal from './SuccessModal'; // <--- BƯỚC 1: Import Modal

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
  const [isModalOpen, setIsModalOpen] = useState(false); // <--- BƯỚC 2: Thêm state cho Modal

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
    // Thay vì alert(), hãy mở Modal
    setIsModalOpen(true); // <--- BƯỚC 3: Mở Modal
    // alert("Gửi yêu cầu thành công!\nVui lòng đợi thông báo sau."); // <-- Xóa dòng này
  };

  const handleCancel = () => {
    setFormData(initialData);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Tùy chọn: Reset form sau khi đóng modal
    // setFormData(initialData);
  };

  // Component con: Header Form
  const FormHeader = () => (
    <div className="bg-blue-600 text-white p-6 rounded-t-lg text-center">
      <h2 className="text-2xl font-bold">Form đăng ký</h2>
      <p className="text-sm mt-1">Sinh viên điền thông tin và nhu cầu để đăng ký tham gia chương trình</p>
    </div>
  );

  // Component con: Khối Form
  const FormBlock: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-500 mt-6">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="text-gray-700">
        {children}
      </div>
    </div>
  );

  return (
    <>
      {/* BƯỚC 4: Thêm component Modal vào trang */}
      <SuccessModal isOpen={isModalOpen} onClose={handleCloseModal} />

      <div className="w-full max-w-3xl mx-auto">
        <FormHeader />

        <div className="p-6 bg-white rounded-b-lg shadow-lg">
          
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
              className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md shadow-sm hover:bg-blue-700 transition"
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
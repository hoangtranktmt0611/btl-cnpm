// components/TutorCriteriaForm.tsx
'use client';

import React, { useState } from 'react';
import { Major } from '@/types';

interface TutorCriteriaFormProps {
  availableMajors: Major[];
}

const initialMajorsSelection = [1]; // Giả sử ID 1 (Chuyên ngành 1) được chọn

const TutorCriteriaForm: React.FC<TutorCriteriaFormProps> = ({ availableMajors }) => {
  const [selectedMajors, setSelectedMajors] = useState(initialMajorsSelection);

  const handleMajorChange = (majorId: number) => {
    setSelectedMajors(prev => {
      const isSelected = prev.includes(majorId);
      if (isSelected) {
        return prev.filter(id => id !== majorId);
      } else {
        return [...prev, majorId];
      }
    });
  };

  const handleSave = () => {
    console.log('Tiêu chí đã lưu:', selectedMajors);
  };

  const handleCancel = () => {
    setSelectedMajors(initialMajorsSelection);
  };

  return (
    <div className="bg-white rounded-[10px] shadow-[0_0_3px_rgba(0,0,0,0.3)] overflow-hidden mb-6">
      
      {/* Khối 'Color Styles' */}
      <div className="h-25 w-full bg-[#4BA4E3]" />

      <div className="p-4 bg-white rounded-[10px] shadow-[0_0_3px_rgba(0,0,0,0.3)]">
        <p className="text-[20px] font-bold text-gray-800 mb-2">Form điền tiêu chí tìm Tutor</p>
        <p className="text-sm text-gray-500 mb-6">Let's learn about colors, color contrast and color styles...</p>

        {/* Nhu cầu hỗ trợ */}
        <div className="mb-6">
          <h4 className="font-semibold mb-2">Nhu cầu hỗ trợ</h4>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 min-h-[100px]"
            placeholder="Nhập nhu cầu hỗ trợ..."
          />
        </div>

        {/* Yêu cầu lĩnh vực, chuyên ngành */}
        <div className="mb-8">
          <h4 className="font-semibold mb-3">Yêu cầu lĩnh vực, chuyên ngành</h4>
          {availableMajors.map((major) => (
            <div key={major.id} className="flex items-center mb-2">
              <input
                type="checkbox"
                id={`major-${major.id}`}
                checked={selectedMajors.includes(major.id)}
                onChange={() => handleMajorChange(major.id)}
                className="form-checkbox h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <label htmlFor={`major-${major.id}`} className="ml-3 text-sm text-gray-700">
                {major.name}
              </label>
            </div>
          ))}
        </div>

        {/* Tiêu chí */}
        <div className="mb-6">
          <h4 className="font-semibold mb-2">Tiêu chí</h4>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 min-h-[100px]"
            placeholder="Liệt kê các tiêu chí..."
          />
        </div>

        {/* Nút Save và Cancel */}
        <div className="flex justify-end space-x-3 pt-4">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-[#4BA4E3] text-white font-medium rounded-md text-sm shadow-sm hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-red-600 text-white font-medium rounded-md text-sm shadow-sm hover:bg-red-700 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default TutorCriteriaForm;
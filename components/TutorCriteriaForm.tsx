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
    <div className="bg-white p-6 rounded-lg shadow-lg border-t-8 border-amber-500">
      
      {/* Khối 'Color Styles' */}
      <div className="bg-amber-50 p-4 mb-6 rounded-md flex items-start space-x-4">
        <div className="w-16 h-16 bg-white border border-gray-300 rounded-lg p-2 flex flex-wrap content-start shrink-0">
          {[...Array(8)].map((_, i) => (
             <div key={i} className={`w-1/4 h-1/4 ${i % 2 === 0 ? 'bg-amber-600' : 'bg-gray-600'}`}></div>
          ))}
        </div>
        <div>
            <p className="font-bold text-gray-800">Color Styles</p>
            <p className="text-sm text-gray-600">Let's learn about colors, color contrast and color styles...</p>
        </div>
      </div>

      <p className="font-semibold text-gray-800 mb-2">Form điền tiêu chí tìm Tutor</p>
      <p className="text-sm text-gray-500 mb-6">Let's learn about colors, color contrast and color styles...</p>
      
      {/* Nhu cầu lĩnh vực, chuyên ngành */}
      <div className="mb-8">
        <h4 className="font-semibold mb-3">Nhu cầu lĩnh vực, chuyên ngành</h4>
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
        {/* Thêm các input khác nếu cần */}
      </div>

      {/* Nút Save và Cancel */}
      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md text-sm shadow-sm hover:bg-blue-700 transition"
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
  );
};

export default TutorCriteriaForm;
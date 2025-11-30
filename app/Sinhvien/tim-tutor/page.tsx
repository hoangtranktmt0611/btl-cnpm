// app/Sinhvien/tim-tutor/page.tsx
'use client';

import React from 'react';
import { Tutor, Major } from '@/types';
import TutorList from '@/components/TutorList';
import TutorCriteriaForm from '@/components/TutorCriteriaForm';

// Dữ liệu mock
const MOCK_TUTORS: Tutor[] = [
  { MSCB: '2011234', HoVaTen: 'Nguyễn Văn An', Email: 'an.nguyen@hcmut.edu.vn' },
  { MSCB: '2011235', HoVaTen: 'Trần Thị Bình', Email: 'binh.tran@hcmut.edu.vn' },
  { MSCB: '2011236', HoVaTen: 'Lê Hoàng Châu', Email: 'chau.le@hcmut.edu.vn' },
  { MSCB: '2011237', HoVaTen: 'Phạm Minh Đức', Email: 'duc.pham@hcmut.edu.vn' },
  { MSCB: '2011238', HoVaTen: 'Võ Thị Hoa', Email: 'hoa.vo@hcmut.edu.vn' },
  { MSCB: '2011239', HoVaTen: 'Đặng Văn Khoa', Email: 'khoa.dang@hcmut.edu.vn' },
];

const MOCK_MAJORS: Major[] = [
  { id: 1, name: 'Chuyên ngành 1' },
  { id: 2, name: 'Chuyên ngành 2' },
  { id: 3, name: 'Chuyên ngành 3' },
  { id: 4, name: 'Chuyên ngành 4' },
];

export default function TimTutorPage() {
  return (
    // Bố cục 2 cột
    <div className="space-y-6 bg-white py-6 px-12 rounded-[10px] shadow-[0_4px_3px_rgba(0,0,0,0.2)] mt-3">
      <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
              
          {/* Cột trái - Danh sách Tutor */}
          <div className="flex-1">
              <div className="mb-6">
                  <p className="text-2xl font-semibold text-gray-800">Danh sách Tutor</p>
              </div>
              <TutorList tutors={MOCK_TUTORS} />
          </div>

          {/* Cột phải - Form Tiêu chí */}
          <div className="w-full lg:w-96 shrink-0">
              <TutorCriteriaForm availableMajors={MOCK_MAJORS} />
          </div>

      </div>
    </div>
  );
}
// components/TutorList.tsx
import React from 'react';
import { Tutor } from '@/types'; 
import {Search} from 'lucide-react';

interface TutorListProps {
  tutors: Tutor[];
}

const TutorList: React.FC<TutorListProps> = ({ tutors }) => {
  return (
    <div className="">
      {/* Thanh tìm kiếm */}
      <div className="relative mb-3 text-gray-600">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
              <Search size={16} />
          </span>
          <input type="text" placeholder="Tìm kiếm theo tên hoặc MSCB..." className="w-1/2 pl-10 p-2 bg-[#F3F3F5] border border-gray-200 rounded-[10px]" />
      </div>
      
      {/* Bảng dữ liệu */}
      <div className="">
        <table className="min-w-full divide-y divide-gray-200 rounded-[10px] shadow-[0_0_3px_rgba(0,0,0,0.2)]">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercaser">MSCB</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Họ và Tên</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Email</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tutors.map((tutor) => (
              <tr key={tutor.MSCB} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium">{tutor.MSCB}</td>
                <td className="px-6 py-4 text-sm">{tutor.HoVaTen}</td>
                <td className="px-6 py-4 text-sm text-blue-600">{tutor.Email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TutorList;
// app/tim-tutor/page.tsx
'use client'; 

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Users, Calendar, ListChecks, MessageSquare, PlusSquare } from 'lucide-react'; 

// --- 1. TYPESCRIPT INTERFACES (Thay thế cho types/index.ts) ---
interface Tutor {
  MSCB: string; 
  HoVaTen: string; 
  Email: string;
}

interface Major {
  id: number;
  name: string;
}

// --- 2. MOCK DATA (Dữ liệu giả lập) ---
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

const sidebarItems: { name: string; icon: React.ElementType; href: string; }[] = [
  { name: 'Đăng ký tham gia', icon: PlusSquare, href: '/dang-ky' },
  { name: 'Tìm Tutor', icon: Search, href: '/tim-tutor' }, 
  { name: 'Bảng điều khiển', icon: ListChecks, href: '/dashboard' },
  { name: 'Lịch học', icon: Calendar, href: '/lich-hoc' },
  { name: 'Lớp học của tôi', icon: Users, href: '/lop-hoc-cua-toi' },
  { name: 'Tin nhắn', icon: MessageSquare, href: '/tin-nhan' },
];


// --- 3. SIDEBAR COMPONENT ---
interface SidebarProps {
  activeItem: string; 
}

const Sidebar: React.FC<SidebarProps> = ({ activeItem }) => {
  return (
    <div className="flex flex-col w-64 bg-white h-screen border-r border-gray-200 sticky top-0">
      
      {/* Logo và Tiêu đề */}
      <div className="flex items-center p-6 border-b border-gray-200">
        <div className="bg-blue-600 p-2 rounded mr-2">
            <span className="text-white font-bold text-lg">BS</span>
        </div>
        <span className="text-lg font-semibold text-gray-800 leading-tight">Tutor Support<br/>System</span>
      </div>

      {/* Danh sách Menu */}
      <nav className="flex-1 p-4 space-y-1">
        {sidebarItems.map((item) => {
          const isActive = item.name === activeItem;
          
          return (
            <Link 
              key={item.name} 
              href={item.href} 
              className={`
                flex items-center px-3 py-3 rounded-lg transition-colors duration-150 
                ${isActive 
                    ? 'bg-blue-500 text-white shadow-md' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }
              `}
            >
              <item.icon className="w-5 h-5 mr-3" />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Thông tin người dùng (placeholder) */}
      <div className="p-4 border-t border-gray-200">
        <div className="text-sm text-gray-700">Tên người dùng: Yatzilín</div>
      </div>
    </div>
  );
};

// --- 4. TUTOR LIST COMPONENT ---
interface TutorListProps {
  tutors: Tutor[];
}

const TutorList: React.FC<TutorListProps> = ({ tutors }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Tìm kiếm theo tên hoặc MSCB..."
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      
      <div className="overflow-x-auto border rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">MSCB</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Họ và Tên</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tutors.map((tutor) => (
              <tr key={tutor.MSCB} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{tutor.MSCB}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{tutor.HoVaTen}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-800 cursor-pointer">{tutor.Email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// --- 5. TUTOR CRITERIA FORM COMPONENT ---
interface TutorCriteriaFormProps {
  availableMajors: Major[];
}

const initialMajorsSelection = [1]; 

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
        {/* Hình ảnh mô phỏng Color Styles */}
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
      
      {/* Nhu cầu hỗ trợ */}
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
        {/* Placeholder cho các tiêu chí khác */}
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


// --- 6. PAGE COMPONENT (Export mặc định) ---
export default function TimTutorPage() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* 1. Sidebar */}
      <Sidebar activeItem="Tìm Tutor" /> 
      
      {/* 2. Nội dung chính */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Header - Chi tiết lớp học */}
        <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
            <h1 className="text-xl font-bold text-gray-800">Chi tiết lớp học</h1>
            {/* User Info/Avatar */}
            <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-700">Yatzilín</span>
                <Users className="w-6 h-6 text-gray-500" /> 
            </div>
        </header>

        {/* Khu vực làm việc chính */}
        <main className="flex-1 overflow-y-auto p-8 flex space-x-6">
            
            {/* Cột trái - Danh sách Tutor */}
            <div className="w-2/3 space-y-4">
                <div className="mb-4">
                    <p className="text-2xl font-semibold text-gray-800">Danh sách Tutor</p>
                    <p className="text-sm text-gray-500">Let's learn about colors, color contrast and color styles...</p>
                </div>
                <TutorList tutors={MOCK_TUTORS} />
            </div>

            {/* Cột phải - Form Tiêu chí */}
            <div className="w-1/3">
                <TutorCriteriaForm availableMajors={MOCK_MAJORS} />
            </div>

        </main>
      </div>
    </div>
  );
}
// components/SidebarAdmin.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { 
    LayoutDashboard, 
    BookCopy, 
    Users, 
    UserCheck, 
    ClipboardCheck, 
    FileText, 
    TrendingUp, 
    Settings,
    LogOut
} from 'lucide-react'; 

interface SidebarItem {
  name: string;
  icon: React.ElementType;
  href: string;
}

// Danh sách menu cho Admin
const sidebarItems: SidebarItem[] = [
  { name: 'Tổng quan', icon: LayoutDashboard, href: '/Admin/dashboard' },
  { name: 'Quản lý lớp học', icon: BookCopy, href: '/Admin/class-mgt' },
  { name: 'Quản lý sinh viên', icon: Users, href: '/Admin/student-mgt' },
  { name: 'Quản lý Tutor', icon: UserCheck, href: '/Admin/tutor-mgt' },
  { name: 'Xử lý yêu cầu', icon: ClipboardCheck, href: '/Admin/request-mgt' },
  { name: 'Báo cáo', icon: FileText, href: '/Admin/reports' },
  { name: 'Giám sát tiến độ', icon: TrendingUp, href: '/Admin/progress' },
  { name: 'Cài đặt', icon: Settings, href: '#' }, // Sẽ trỏ đến Modal Cài đặt
];

interface SidebarProps {
  activeItem: string;
}

const SidebarAdmin: React.FC<SidebarProps> = ({ activeItem }) => {
  return (
    <div className="flex flex-col w-64 bg-white h-screen border-r border-gray-200 sticky top-0 shrink-0">
      
      <div className="flex items-center p-6 border-b border-gray-200">
        <div className="bg-blue-600 p-2 rounded mr-2">
            <span className="text-white font-bold text-lg">BS</span>
        </div>
        <span className="text-lg font-semibold text-gray-800 leading-tight">Hệ Thống Tutor<br/>Admin Portal</span>
      </div>

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
      
      <div className="p-4 border-t border-gray-200">
        <button className="flex items-center px-3 py-3 text-gray-600 hover:bg-gray-100 w-full rounded-lg">
            <LogOut className="w-5 h-5 mr-3" />
            <span className="font-medium">Đăng xuất</span>
        </button>
      </div>
    </div>
  );
};

export default SidebarAdmin;
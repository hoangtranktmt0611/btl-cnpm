// components/SidebarTutor.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { LayoutDashboard, Calendar, Users, PlusSquare, MessageSquare } from 'lucide-react'; 

interface SidebarItem {
  name: string;
  icon: React.ElementType;
  href: string;
}

// Danh sách menu cho Tutor
const sidebarItems: SidebarItem[] = [
  { name: 'Bảng điều khiển', icon: LayoutDashboard, href: '/Tutor/dashboard' },
  { name: 'Lịch dạy', icon: Calendar, href: '/Tutor/schedule' },
  { name: 'Lớp học của tôi', icon: Users, href: '/Tutor/my-classes' },
  { name: 'Đăng ký lớp học', icon: PlusSquare, href: '/Tutor/register-class' },
  { name: 'Tin nhắn', icon: MessageSquare, href: '/Tutor/tin-nhan' },
];

interface SidebarProps {
  activeItem: string; // Tên của mục đang hoạt động
}

const SidebarTutor: React.FC<SidebarProps> = ({ activeItem }) => {
  return (
    <div className="flex flex-col w-64 bg-white h-screen border-r border-gray-200 sticky top-0 shrink-0">
      
      <div className="flex items-center p-6 border-b border-gray-200">
        <div className="bg-blue-600 p-2 rounded mr-2">
            <span className="text-white font-bold text-lg">BS</span>
        </div>
        <span className="text-lg font-semibold text-gray-800 leading-tight">Tutor Support<br/>System</span>
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
      </div>
    </div>
  );
};

export default SidebarTutor;
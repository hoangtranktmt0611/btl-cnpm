// components/Sidebar.tsx
import React from 'react';
import Link from 'next/link';
import { Search, Users, PlusSquare, LayoutDashboard,CalendarDays,MessagesSquare} from 'lucide-react'; 

interface SidebarItem {
  name: string;
  icon: React.ElementType;
  href: string;
}

const sidebarItems: SidebarItem[] = [
  { name: 'Đăng ký tham gia', icon: PlusSquare, href: '/Sinhvien/dang-ky' }, 
  { name: 'Tìm Tutor', icon: Search, href: '/Sinhvien/tim-tutor' },
  { name: 'Bảng điều khiển', icon: LayoutDashboard, href: '/Sinhvien/dashboard' },
  { name: 'Lịch học', icon: CalendarDays, href: '/Sinhvien/schedule' },
  { name: 'Lớp học của tôi', icon: Users, href: '/Sinhvien/my-classes' },
  { name: 'Tin nhắn', icon: MessagesSquare, href: '/Sinhvien/tin-nhan' },
];

interface SidebarProps {
  activeItem: string;
}

const Sidebar: React.FC<SidebarProps> = ({ activeItem }) => {
  return (
    <div className="w-[14%] bg-white shadow-[0_0_10px_rgba(0,0,0,0.2)] h-screen fixed left-0 top-0 flex flex-col">
      <div className="flex items-center justify-center h-20">
        <div className="flex items-center gap-2">
          <img src="/bklogo_transparent.png" alt="Logo" className="w-15 h-17" />
          <div>
            <p className="font-bold text-black-700 font-sans">Tutor Support</p>
            <p className="font-mono text-sm text-gray-500">System</p>
          </div>
        </div>
      </div>
      <nav className="flex flex-col gap-1 mt-4 px-3">
        {sidebarItems.map((item) => {
          const isActive = item.name === activeItem;
          return (
            <Link 
              key={item.name} 
              href={item.href} 
              className={`
                flex items-center gap-3 px-3 py-2 rounded-lg transition-all 
                ${isActive 
                  ? "bg-[#4BA4E3] text-white"
                  : "text-gray-600 hover:bg-[#4BA4E3]/80 hover:text-white"
                }
              `}
            >
              <item.icon ize={20}/>
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
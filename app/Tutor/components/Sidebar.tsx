"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  GraduationCap,
  MessagesSquare,
} from "lucide-react";

const menuItems = [
  { name: "Bảng điều khiển", icon: LayoutDashboard, href: "/Tutor/Dashboard" },
  { name: "Lịch dạy", icon: CalendarDays, href: "/Tutor/Schedule" },
  { name: "Lớp học của tôi", icon: Users, href: "/Tutor/my-classes" },
  { name: "Đăng ký lớp học", icon: GraduationCap, href: "/Tutor/register-class" },
  { name: "Tin nhắn", icon: MessagesSquare, href: "/Tutor/tin-nhan" },
];

interface SidebarProps {
  activeItem: string;
}

const Sidebar: React.FC<SidebarProps> = ({ activeItem }) => {
  const pathname = usePathname();

  return (
    <aside className="w-[14%] bg-white shadow-[0_0_10px_rgba(0,0,0,0.2)] h-screen fixed left-0 top-0 flex flex-col">
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
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.name === activeItem;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                isActive
                  ? "bg-[#4BA4E3] text-white"
                  : "text-gray-600 hover:bg-[#4BA4E3]/80 hover:text-white"
              }`}
            >
              <Icon size={20} />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
export default Sidebar;

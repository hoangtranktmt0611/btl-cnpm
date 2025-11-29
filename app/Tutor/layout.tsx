'use client';
import React from 'react';
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { usePathname } from 'next/navigation';


// Hàm helper để xác định mục active và tiêu đề
const getPathDetails = (pathname: string) => {
    if (pathname.includes('/Dashboard')) {
        return { activeItem: 'Bảng điều khiển', title: 'Bảng điều khiển' };
    }
    if (pathname.includes('/Schedule')) {
        return { activeItem: 'Lịch dạy', title: 'Lịch dạy' };
    }
    if (pathname.includes('/my-classes')) {
        // Xử lý trang chi tiết
        if (pathname.split('/').length > 3) { // /Sinhvien/my-classes/[classId]
            return { activeItem: 'Lớp học của tôi', title: 'Chi tiết lớp học' };
        }
        return { activeItem: 'Lớp học của tôi', title: 'Lớp học của tôi' };
    }
    if (pathname.includes('/register-class')) {
        return { activeItem: 'Đăng ký lớp học', title: 'Đăng ký lớp học' };
    }
    if (pathname.includes('/tin-nhan')) {
        return { activeItem: 'Tin nhắn', title: 'Tin nhắn' };
    }
    return { activeItem: '', title: 'Tutor Support System' }; // Trang mặc định
};

export default function TutorLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { activeItem, title } = getPathDetails(pathname);

  return (
    <div className="flex bg-[#F5F8FF] min-h-screen">
      <div className="w-[14%]">
        <Sidebar activeItem={activeItem} />
      </div>
      <div className="p-3 flex-1">
        <Header />
        <main className="">{children}</main>
      </div>
    </div>
  );
}

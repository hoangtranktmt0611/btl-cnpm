// app/Tutor/layout.tsx
'use client';

import React from 'react';
import SidebarTutor from '@/components/SidebarTutor'; // Import Sidebar MỚI
import AccountDropdown from '@/components/AccountDropdown';
import NotificationDropdown from '@/components/NotificationDropdown';
import { usePathname } from 'next/navigation';

// Hàm helper để xác định mục active và tiêu đề
const getPathDetails = (pathname: string) => {
    if (pathname.includes('/dashboard')) {
        return { activeItem: 'Bảng điều khiển', title: 'Bảng điều khiển' };
    }
    if (pathname.includes('/schedule')) {
        return { activeItem: 'Lịch dạy', title: 'Lịch dạy' };
    }
    if (pathname.includes('/my-classes')) {
        if (pathname.split('/').length > 3) { // /Tutor/my-classes/[classId]
            return { activeItem: 'Lớp học của tôi', title: 'Chi tiết lớp học' };
        }
        return { activeItem: 'Lớp học của tôi', title: 'Lớp học của tôi' };
    }
     if (pathname.includes('/register-class')) {
         if (pathname.split('/').length > 3) { // /Tutor/register-class/[classId]
            return { activeItem: 'Đăng ký lớp học', title: 'Tạo lịch học' };
        }
        return { activeItem: 'Đăng ký lớp học', title: 'Đăng ký lớp học' };
    }
    if (pathname.includes('/tin-nhan')) {
        return { activeItem: 'Tin nhắn', title: 'Tin nhắn' };
    }
    return { activeItem: '', title: 'Tutor Support System' }; 
};

export default function TutorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const { activeItem, title } = getPathDetails(pathname);

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* 1. Sidebar (Luôn hiển thị) */}
            <SidebarTutor activeItem={activeItem} />
            
            {/* 2. Nội dung chính (Thay đổi theo trang) */}
            <div className="flex-1 flex flex-col overflow-hidden">
                
                {/* Header (Luôn hiển thị) */}
                <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
                    <h1 className="text-xl font-bold text-gray-800">
                        {title}
                    </h1>
                    
                    <div className="flex items-center space-x-3">
                        <NotificationDropdown />
                        <AccountDropdown userName="Yatzilín" />
                    </div>
                </header>

                {/* Nội dung trang (page.tsx) sẽ được render ở đây */}
                <main className="flex-1 overflow-y-auto p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
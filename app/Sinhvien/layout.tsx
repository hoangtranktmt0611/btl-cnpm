// app/Sinhvien/layout.tsx
'use client';

import React from 'react';
import Sidebar from '@/components/Sidebar'; 
import AccountDropdown from '@/components/AccountDropdown';
import NotificationDropdown from '@/components/NotificationDropdown';
import { usePathname } from 'next/navigation';
import { ListIndentIncrease } from 'lucide-react'; 

// Hàm helper để xác định mục active và tiêu đề
const getPathDetails = (pathname: string) => {
    if (pathname.includes('/dashboard')) {
        return { activeItem: 'Bảng điều khiển', title: 'Bảng điều khiển' };
    }
    if (pathname.includes('/schedule')) {
        return { activeItem: 'Lịch học', title: 'Lịch học' };
    }
    if (pathname.includes('/my-classes')) {
        // Xử lý trang chi tiết
        if (pathname.split('/').length > 3) { // /Sinhvien/my-classes/[classId]
            return { activeItem: 'Lớp học của tôi', title: 'Chi tiết lớp học' };
        }
        return { activeItem: 'Lớp học của tôi', title: 'Lớp học của tôi' };
    }
    if (pathname.includes('/tin-nhan')) {
        return { activeItem: 'Tin nhắn', title: 'Tin nhắn' };
    }
    if (pathname.includes('/tim-tutor')) {
        return { activeItem: 'Tìm Tutor', title: 'Tìm Tutor' };
    }
    if (pathname.includes('/dang-ky')) {
        return { activeItem: 'Đăng ký tham gia', title: 'Đăng ký tham gia' };
    }
    return { activeItem: '', title: 'Tutor Support System' }; // Trang mặc định
};

export default function SinhvienLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const { activeItem, title } = getPathDetails(pathname);

    return (
        <div className="flex bg-[#F5F8FF] min-h-screen">
            {/* 1. Sidebar (Luôn hiển thị) */}
            <div className="w-[14%]">
                <Sidebar activeItem={activeItem} />
            </div>
            
            {/* 2. Nội dung chính (Thay đổi theo trang) */}
            <div className="p-3 flex-1">
                
                {/* Header (Luôn hiển thị) */}
                <header className="w-full flex items-center justify-between rounded-[10px] shadow-[0_4px_3px_rgba(0,0,0,0.2)] bg-white p-2">
                    <div className="flex items-center gap-4">
                        <ListIndentIncrease className="text-gray-600" size={22} />
                        <h1  className="text-lg font-semibold text-gray-800">{title}</h1>
                    </div>                    
                    
                    {/* Các icon bên phải Header */}
                    <div className="flex items-center space-x-3">
                        <NotificationDropdown />
                        <AccountDropdown userName="Yatzilín" />
                    </div>
                </header>

                {/* Nội dung trang (page.tsx) sẽ được render ở đây */}
                <main className="flex-1">
                    {children}
                </main>
            </div>
        </div>
    );
}
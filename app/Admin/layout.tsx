// app/Admin/layout.tsx
'use client';

import React from 'react';
import SidebarAdmin from '@/components/SidebarAdmin'; // Import Sidebar MỚI
import AccountDropdown from '@/components/AccountDropdown';
import NotificationDropdown from '@/components/NotificationDropdown';
import { usePathname } from 'next/navigation';

// Hàm helper để xác định mục active và tiêu đề
const getPathDetails = (pathname: string) => {
    if (pathname.includes('/dashboard')) {
        return { activeItem: 'Tổng quan', title: 'Tổng quan' };
    }
    if (pathname.includes('/class-mgt')) {
        return { activeItem: 'Quản lý lớp học', title: 'Quản lý lớp học' };
    }
    if (pathname.includes('/student-mgt')) {
        return { activeItem: 'Quản lý sinh viên', title: 'Quản lý sinh viên' };
    }
    if (pathname.includes('/tutor-mgt')) {
        return { activeItem: 'Quản lý Tutor', title: 'Quản lý Tutor' };
    }
    if (pathname.includes('/request-mgt')) {
        return { activeItem: 'Xử lý yêu cầu', title: 'Xử lý yêu cầu' };
    }
    if (pathname.includes('/reports')) {
        return { activeItem: 'Báo cáo', title: 'Báo cáo' };
    }
    if (pathname.includes('/progress')) {
        return { activeItem: 'Giám sát tiến độ', title: 'Giám sát tiến độ' };
    }
    if (pathname.includes('/settings')) {
        return { activeItem: 'Cài đặt', title: 'Cài đặt' };
    }
    return { activeItem: '', title: 'Admin Portal' }; 
};

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const { activeItem, title } = getPathDetails(pathname);

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* 1. Sidebar (Luôn hiển thị) */}
            <SidebarAdmin activeItem={activeItem} />
            
            {/* 2. Nội dung chính (Thay đổi theo trang) */}
            <div className="flex-1 flex flex-col overflow-hidden">
                
                {/* Header (Luôn hiển thị) */}
                <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
                    <h1 className="text-xl font-bold text-gray-800">
                        {title}
                    </h1>
                    
                    <div className="flex items-center space-x-3">
                        <NotificationDropdown />
                        {/* Avatar "AD" (Admin) với 5 thông báo */}
                        <div className="relative">
                            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-xs text-white">5</span>
                            <AccountDropdown userName="AD" />
                        </div>
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
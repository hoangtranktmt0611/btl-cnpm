// app/Sinhvien/tin-nhan/layout.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search } from 'lucide-react';

// --- Dữ liệu Mock cho Danh sách Chat ---
// (Bạn nên lấy danh sách này từ API trong thực tế)
const MOCK_MESSAGES_LIST = [
    { id: 1, sender: 'Nguyễn Văn A', lastMessage: 'Cụ thể là bài 3 phần tích phân, em không hiểu cách làm', time: '14:31', unread: 1 },
    { id: 2, sender: 'Trần Thị B', lastMessage: 'Ok em, thầy đã gửi qua email nhé.', time: 'Hôm qua', unread: 0 },
    { id: 3, sender: 'Lê Hoàng C', lastMessage: 'Cảm ơn thầy đã giúp em.', time: '2 ngày trước', unread: 0 },
];

// --- Component Sidebar Chat ---
// (Logic này được trích ra từ file page.tsx cũ của bạn)
const ChatSidebar = () => {
    const pathname = usePathname(); // Dùng để highlight active chat

    return (
        <div className="w-full md:w-80 border-r bg-white flex flex-col h-full">
            <div className="p-4 border-b">
                <div className="flex items-center border border-gray-300 rounded-md bg-white p-2 shadow-sm">
                    <Search className="w-4 h-4 text-gray-500 mr-2" />
                    <input
                        type="text"
                        placeholder="Tìm kiếm cuộc trò chuyện..."
                        className="w-full text-sm focus:outline-none"
                    />
                </div>
            </div>
            
            {/* Danh sách các cuộc hội thoại */}
            <div className="overflow-y-auto flex-1">
                {MOCK_MESSAGES_LIST.map((chat) => {
                    // Tạo link động
                    const href = `/Tutor/tin-nhan/${chat.id}`;
                    // Kiểm tra xem link có đang active không
                    const isActive = pathname === href;

                    return (
                        <Link 
                            href={href}
                            key={chat.id} 
                            className={`flex items-center p-4 cursor-pointer hover:bg-gray-100 ${isActive ? 'bg-blue-50 border-l-4 border-blue-600' : ''}`}
                        >
                            <div className="w-10 h-10 bg-gray-300 rounded-full mr-3 flex items-center justify-center text-white font-semibold shrink-0">
                                {chat.sender.charAt(0)}
                            </div>
                            <div className="flex-1 overflow-hidden">
                                <div className="flex justify-between items-center">
                                    <span className="font-semibold text-gray-800 truncate">{chat.sender}</span>
                                    {chat.unread > 0 && (
                                        <span className="text-xs bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center shrink-0">
                                            {chat.unread}
                                        </span>
                                    )}
                                </div>
                                <p className="text-xs text-gray-500 truncate">{chat.lastMessage}</p>
                            </div>
                            <span className="text-xs text-gray-400 ml-2 shrink-0">{chat.time}</span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

// --- Layout Chính ---
export default function TinNhanLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        // Bố cục 2 cột (Sidebar + Nội dung)
        <div className="mt-3 h-[calc(100vh-140px)] flex rounded-[10px] shadow-[0_4px_3px_rgba(0,0,0,0.2)] overflow-hidden">
            
            {/* Cột trái: Danh sách cuộc trò chuyện */}
            <ChatSidebar />
            
            {/* Cột phải: Nội dung chat (sẽ là page.tsx hoặc [peopleId]/page.tsx) */}
            <div className="flex-1">
                {children}
            </div>
        </div>
    );
}
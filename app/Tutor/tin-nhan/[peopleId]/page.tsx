// app/Sinhvien/tin-nhan/[peopleId]/page.tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'next/navigation'; // Dùng để lấy peopleId
import { Send, MoreVertical, User, BellOff, Archive, XCircle, ShieldAlert, Trash2 } from 'lucide-react'; 
import UserProfileModal from '@/components/UserProfileModal';

// --- CƠ SỞ DỮ LIỆU GIẢ (MOCK DB) ---
// Thông tin người dùng
const MOCK_PEOPLE_DB: { [key: string]: { id: number; sender: string } } = {
    '1': { id: 1, sender: 'Nguyễn Văn A' },
    '2': { id: 2, sender: 'Trần Thị B' },
    '3': { id: 3, sender: 'Lê Hoàng C' },
};

// Lịch sử chat (khác nhau cho mỗi người)
const MOCK_HISTORY_DB: { [key: string]: { id: number; text: string; sender: 'student' | 'tutor'; time: string }[] } = {
    '1': [
        { id: 1, text: 'Chào thầy ạ', sender: 'student', time: '14:20' },
        { id: 2, text: 'Chào em, có chuyện gì thế', sender: 'tutor', time: '14:22' },
        { id: 3, text: 'Em có câu hỏi về bài tập tuần này ạ', sender: 'student', time: '14:30' },
        { id: 4, text: 'Cụ thể là bài 3 phần tích phân, em không hiểu cách làm', sender: 'student', time: '14:31' },
    ],
    '2': [
        { id: 1, text: 'Thầy có thể gửi slide bài giảng không.', sender: 'student', time: 'Hôm qua' },
        { id: 2, text: 'Ok em, thầy đã gửi qua email nhé.', sender: 'tutor', time: 'Hôm qua' },
    ],
    '3': [
        { id: 1, text: 'Cảm ơn thầy đã giúp em.', sender: 'student', time: '2 ngày trước' },
    ],
};
// ------------------------------------

// --- Component Khung Chat ---
// (Gần như giống hệt code ChatWindow ở phản hồi trước)
const ChatWindow: React.FC<{ recipientName: string; chatHistory: any[] }> = ({ recipientName, chatHistory }) => {
    const [isChatMenuOpen, setIsChatMenuOpen] = useState(false);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsChatMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Menu 3 chấm (Không đổi)
    const ChatMenu = () => (
        <div className="absolute top-12 right-0 w-56 bg-white rounded-md shadow-lg border z-20" ref={menuRef}>
            <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => { setIsProfileModalOpen(true); setIsChatMenuOpen(false); }}>
                <User className="w-4 h-4 mr-2" /> Xem hồ sơ
            </button>
            <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <BellOff className="w-4 h-4 mr-2" /> Tắt thông báo
            </button>
            <button className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                <XCircle className="w-4 h-4 mr-2" /> Chặn người dùng
            </button>
            {/* ... (thêm các nút khác nếu cần) ... */}
        </div>
    );

    return (
        <>
            <UserProfileModal isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)} />

            <div className="flex-1 flex flex-col bg-white h-full">
                {/* Header chat (tên người nhận) */}
                <div className="p-4 border-b flex items-center justify-between shadow-sm">
                    <div>
                        <button 
                            className="text-lg font-bold text-gray-800 hover:underline"
                            onClick={() => setIsProfileModalOpen(true)}
                        >
                            {recipientName}
                        </button>
                        <p className="text-xs text-green-500">Đang hoạt động</p>
                    </div>
                    
                    <div className="relative">
                        <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full" onClick={() => setIsChatMenuOpen(!isChatMenuOpen)}>
                            <MoreVertical className="w-5 h-5" />
                        </button>
                        {isChatMenuOpen && <ChatMenu />}
                    </div>
                </div>

                {/* Lịch sử tin nhắn (ĐỘNG) */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {chatHistory.map(msg => (
                        <div key={msg.id} className={`flex ${msg.sender === 'tutor' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-xs md:max-w-md p-3 rounded-lg shadow-sm text-sm ${msg.sender === 'tutor' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-tl-none'}`}>
                                <p>{msg.text}</p>
                                <span className={`text-xs mt-1 block ${msg.sender === 'tutor' ? 'text-blue-200' : 'text-gray-500'} text-right`}>{msg.time}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Khung soạn tin nhắn */}
                <div className="p-4 border-t">
                    <div className="flex items-center space-x-3">
                        <input
                            type="text"
                            placeholder="Nhập tin nhắn..."
                            className="flex-1 p-3 border border-gray-300 rounded-full focus:ring-blue-500 focus:border-blue-500"
                        />
                        <button className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

// --- Trang Chính (Page) ---
export default function PeopleChatPage() {
    const params = useParams();
    const peopleId = params.peopleId as string;

    // Lấy dữ liệu động từ "database"
    const recipient = MOCK_PEOPLE_DB[peopleId];
    const chatHistory = MOCK_HISTORY_DB[peopleId] || []; // Lấy lịch sử chat, hoặc mảng rỗng nếu không có

    if (!recipient) {
        return (
             <div className="flex-1 flex h-full items-center justify-center text-gray-500 bg-white">
                Không tìm thấy người dùng.
            </div>
        );
    }

    return (
        <ChatWindow 
            recipientName={recipient.sender} 
            chatHistory={chatHistory} 
        />
    );
}
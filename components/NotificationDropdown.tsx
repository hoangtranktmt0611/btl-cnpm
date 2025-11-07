// components/NotificationDropdown.tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Bell, Check, MailOpen, Trash2, MoreVertical, User as UserIcon } from 'lucide-react'; 

interface Notification {
    id: number;
    title: string;
    message: string;
    timeAgo: string;
    read: boolean;
    type: 'security' | 'general';
}

const MOCK_NOTIFICATIONS: Notification[] = [
    { id: 1, title: 'Chúng tôi phát hiện bạn đang đăng nhập ở thiết bị mới.', message: 'Nếu không phải bạn, hãy nhấp vào đây.', timeAgo: 'Vài X phút trước', read: false, type: 'security' },
    { id: 2, title: 'Bài kiểm tra giữa kỳ đã được mở.', message: 'Hãy vào làm bài trước hạn chót.', timeAgo: '30 phút trước', read: true, type: 'general' },
    { id: 3, title: 'Chúng tôi phát hiện bạn đang đăng nhập ở thiết bị mới.', message: 'Nếu không phải bạn, hãy nhấp vào đây.', timeAgo: '1 giờ trước', read: false, type: 'security' },
    { id: 4, title: 'Lịch học tuần này có sự thay đổi.', message: 'Vui lòng kiểm tra lịch học mới.', timeAgo: '2 giờ trước', read: true, type: 'general' },
];

const NotificationDropdown: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('all'); // 'all' hoặc 'unread'
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const notificationsToShow = MOCK_NOTIFICATIONS.filter(n => activeTab === 'all' || !n.read);
    const unreadCount = MOCK_NOTIFICATIONS.filter(n => !n.read).length;

    // Đóng dropdown khi click bên ngoài
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setIsMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleMarkAllRead = () => {
        // Logic đánh dấu tất cả đã đọc
        console.log("Đã đánh dấu tất cả là đã đọc.");
        setIsMenuOpen(false);
    };

    const handleDeleteRead = () => {
        // Logic xóa tất cả thông báo đã đọc
        console.log("Đã xóa thông báo đã đọc.");
        setIsMenuOpen(false);
    };

    const handleToggleRead = (id: number) => {
        // Logic bật/tắt trạng thái đọc của 1 thông báo
        console.log(`Toggle read status for notification ${id}`);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button 
                className="p-2 rounded-full hover:bg-gray-100 relative" 
                onClick={() => setIsOpen(!isOpen)}
            >
                <Bell className="w-6 h-6 text-gray-700" />
                {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white bg-red-500"></span>
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border z-20">
                    
                    {/* Header và Tab */}
                    <div className="p-3 border-b">
                        <h3 className="text-lg font-semibold mb-2">Notifications</h3>
                        <div className="flex space-x-4 border-b pb-1">
                            <button 
                                onClick={() => setActiveTab('all')}
                                className={`text-sm font-medium ${activeTab === 'all' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                            >
                                Tất cả
                            </button>
                            <button 
                                onClick={() => setActiveTab('unread')}
                                className={`text-sm font-medium ${activeTab === 'unread' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                            >
                                Chưa đọc ({unreadCount})
                            </button>
                        </div>
                    </div>

                    {/* Menu tùy chọn */}
                    <div className="relative">
                         <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            <MoreVertical className="w-5 h-5" />
                        </button>
                        {isMenuOpen && (
                            <div className="absolute top-10 right-2 w-56 bg-white rounded-md shadow-lg border z-30">
                                <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={handleMarkAllRead}>
                                    <MailOpen className="w-4 h-4 mr-2" /> Đánh dấu tất cả thông báo là đã đọc
                                </button>
                                <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={handleDeleteRead}>
                                    <Trash2 className="w-4 h-4 mr-2" /> Xóa tất cả thông báo đã đọc
                                </button>
                            </div>
                        )}
                    </div>
                    
                    {/* Danh sách thông báo */}
                    <div className="max-h-96 overflow-y-auto pt-2">
                        {notificationsToShow.length > 0 ? (
                            notificationsToShow.map(notif => (
                                <div 
                                    key={notif.id} 
                                    className={`flex items-start p-3 hover:bg-gray-50 cursor-pointer border-b ${!notif.read ? 'bg-blue-50' : ''}`}
                                    onClick={() => handleToggleRead(notif.id)}
                                >
                                    {/* Icon Avatar/Type */}
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${notif.type === 'security' ? 'bg-blue-100 text-blue-600' : 'bg-gray-200 text-gray-600'}`}>
                                        <UserIcon className="w-4 h-4" />
                                    </div>
                                    <div className="flex-1">
                                        <p className={`text-sm ${!notif.read ? 'font-semibold' : 'text-gray-700'}`}>{notif.title}</p>
                                        <p className="text-xs text-gray-500 mt-0.5">{notif.message}</p>
                                        <p className="text-xs text-gray-400 mt-1">{notif.timeAgo}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-500 p-4 text-sm">Không có thông báo nào.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationDropdown;
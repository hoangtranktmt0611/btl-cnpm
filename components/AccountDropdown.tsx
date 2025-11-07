// components/AccountDropdown.tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Settings, LogOut, ChevronDown, ChevronUp } from 'lucide-react'; 
import SettingsModal from './SettingsModal'; // <-- 1. Import Modal Cài đặt

interface AccountDropdownProps {
    userName: string;
    avatarUrl?: string; 
}

const AccountDropdown: React.FC<AccountDropdownProps> = ({ userName, avatarUrl }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false); // <-- 2. Thêm state
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        console.log("Đăng xuất...");
        setIsOpen(false);
    };

    const handleSettings = () => {
        setIsSettingsModalOpen(true); // <-- 3. Mở Modal Cài đặt
        setIsOpen(false); // Đóng dropdown
    };

    return (
        <>
            {/* 4. Render Modal (nó sẽ tự ẩn/hiện) */}
            <SettingsModal 
                isOpen={isSettingsModalOpen} 
                onClose={() => setIsSettingsModalOpen(false)} 
            />

            <div className="relative" ref={dropdownRef}>
                <button 
                    className="flex items-center p-2 rounded-lg hover:bg-gray-100 transition-colors" 
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {avatarUrl ? (
                         <img 
                            src={avatarUrl} 
                            alt="Avatar" 
                            className="w-8 h-8 rounded-full bg-gray-300 mr-2" 
                        />
                    ) : (
                        <div className="w-8 h-8 rounded-full bg-gray-300 mr-2 flex items-center justify-center font-bold text-gray-600">
                            {userName.charAt(0)}
                        </div>
                    )}
                    <span className="font-medium text-gray-800 text-sm">{userName}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 ml-1 text-gray-500" /> : <ChevronDown className="w-4 h-4 ml-1 text-gray-500" />}
                </button>

                {isOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border py-1 z-20">
                        <button 
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={handleSettings} // <-- Sử dụng hàm đã cập nhật
                        >
                            <Settings className="w-4 h-4 mr-2" /> Cài đặt
                        </button>
                        <button 
                            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700"
                            onClick={handleLogout}
                        >
                            <LogOut className="w-4 h-4 mr-2" /> Đăng xuất
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default AccountDropdown;
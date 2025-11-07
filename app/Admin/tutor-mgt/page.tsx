// app/Admin/tutor-mgt/page.tsx
'use client';

import React, { useState } from 'react';
import { Search, MoreHorizontal } from 'lucide-react';
import UserProfileModal from '@/components/UserProfileModal'; // Tái sử dụng Modal

// Dữ liệu mock
const MOCK_TUTORS = [
    { id: 'GV001', name: 'Nguyễn Văn B', email: 'vanb@hcmut.edu.vn', phone: '091...001', classCount: 5, status: 'Active' },
    { id: 'GV002', name: 'Trần Văn C', email: 'vanc@hcmut.edu.vn', phone: '091...002', classCount: 3, status: 'Active' },
];

export default function TutorManagementPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleViewDetails = (user: any) => {
        setIsModalOpen(true);
    };

    return (
        <>
            <UserProfileModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold">Danh sách Tutor ({MOCK_TUTORS.length})</h2>
                    <div className="flex items-center border border-gray-300 rounded-md bg-white p-2 w-72">
                        <Search className="w-4 h-4 text-gray-500 mr-2" />
                        <input type="text" placeholder="Tìm kiếm Tutor (MSGV, Tên, Email...)" className="w-full text-sm focus:outline-none" />
                    </div>
                </div>

                <div className="overflow-x-auto border rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        {/* ... (Tạo header table: MSGV, Họ Tên, Email, SĐT, Số lớp, Trạng thái) ... */}
                        <tbody className="bg-white divide-y divide-gray-200">
                            {MOCK_TUTORS.map((tutor) => (
                                <tr key={tutor.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium">{tutor.id}</td>
                                    <td className="px-6 py-4">{tutor.name}</td>
                                    <td className="px-6 py-4 text-blue-600">{tutor.email}</td>
                                    <td className="px-6 py-4">{tutor.phone}</td>
                                    <td className="px-6 py-4">{tutor.classCount}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${tutor.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                                            {tutor.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button onClick={() => handleViewDetails(tutor)} className="text-blue-600 hover:underline text-sm">Xem chi tiết</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
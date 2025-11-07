// app/Admin/student-mgt/page.tsx
'use client';

import React, { useState } from 'react';
import { Search, MoreHorizontal } from 'lucide-react';
import UserProfileModal from '@/components/UserProfileModal'; // Tái sử dụng Modal

// Dữ liệu mock
const MOCK_STUDENTS = [
    { id: '200001', name: 'Nguyễn Văn A', email: 'vana@hcmut.edu.vn', phone: '090...001', class: 'CO2023', status: 'Active' },
    { id: '200002', name: 'Trần Thị B', email: 'thib@hcmut.edu.vn', phone: '090...002', class: 'CO2023', status: 'Active' },
    { id: '200003', name: 'Lê Văn C', email: 'vanc@hcmut.edu.vn', phone: '090...003', class: 'CO2022', status: 'Inactive' },
];

export default function StudentManagementPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    // const [selectedUser, setSelectedUser] = useState(null);

    const handleViewDetails = (user: any) => {
        // setSelectedUser(user);
        setIsModalOpen(true);
    };

    return (
        <>
            {/* Tái sử dụng modal xem chi tiết */}
            <UserProfileModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold">Danh sách sinh viên ({MOCK_STUDENTS.length})</h2>
                    <div className="flex items-center border border-gray-300 rounded-md bg-white p-2 w-72">
                        <Search className="w-4 h-4 text-gray-500 mr-2" />
                        <input type="text" placeholder="Tìm kiếm sinh viên (MSSV, Tên, Email...)" className="w-full text-sm focus:outline-none" />
                    </div>
                </div>

                {/* Bảng dữ liệu */}
                <div className="overflow-x-auto border rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">MSSV</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Họ và Tên</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Số điện thoại</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Lớp</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trạng thái</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"></th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {MOCK_STUDENTS.map((student) => (
                                <tr key={student.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium">{student.id}</td>
                                    <td className="px-6 py-4">{student.name}</td>
                                    <td className="px-6 py-4 text-blue-600">{student.email}</td>
                                    <td className="px-6 py-4">{student.phone}</td>
                                    <td className="px-6 py-4">{student.class}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${student.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                                            {student.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button onClick={() => handleViewDetails(student)} className="text-blue-600 hover:underline text-sm">Xem chi tiết</button>
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
// app/Admin/request-mgt/page.tsx
'use client';

import React from 'react';
import { FileText, UserCheck, Check, X } from 'lucide-react';

// Dữ liệu mock
const MOCK_REQUESTS_ALL = [
    { id: 1, type: 'Đơn xin nghỉ', student: 'SV. Nguyễn Văn A - L01', teacher: 'GV. Nguyễn Văn B', date: '30/10/2025', icon: FileText, status: 'Pending' },
    { id: 2, type: 'Đơn xin đổi lớp', student: 'SV. Lê Thị B - L01', teacher: 'GV. Nguyễn Văn C', date: '17/10/2025', icon: FileText, status: 'Pending' },
    { id: 3, type: 'Đăng ký Tutor', student: 'SV. Trần Văn C', date: '9/10/2025', icon: UserCheck, status: 'Pending' },
    { id: 4, type: 'Đơn xin nghỉ', student: 'SV. Phạm Thị D - L02', teacher: 'GV. Nguyễn Văn B', date: '8/10/2025', icon: FileText, status: 'Approved' },
];

export default function RequestManagementPage() {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
            <h2 className="text-xl font-bold">Tất cả yêu cầu</h2>
            
            <div className="overflow-x-auto border rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Loại yêu cầu</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Người yêu cầu</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Chi tiết</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ngày</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hành động</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {MOCK_REQUESTS_ALL.map((req) => (
                            <tr key={req.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        <req.icon className="w-5 h-5 text-gray-500 mr-2" />
                                        <span className="font-medium">{req.type}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">{req.student}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{req.teacher}</td>
                                <td className="px-6 py-4 text-sm text-gray-500">{req.date}</td>
                                <td className="px-6 py-4">
                                    {req.status === 'Pending' ? (
                                        <div className="flex space-x-2">
                                            <button className="flex items-center px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700">
                                                <Check className="w-4 h-4 mr-1" /> Duyệt
                                            </button>
                                             <button className="flex items-center px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
                                                <X className="w-4 h-4 mr-1" /> Từ chối
                                            </button>
                                        </div>
                                    ) : (
                                        <span className="text-sm font-medium text-green-600">Đã duyệt</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
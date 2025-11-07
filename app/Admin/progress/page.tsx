// app/Admin/progress/page.tsx
'use client';

import React, { useState } from 'react';
import { Search, AlertTriangle, TrendingUp, TrendingDown, MoreHorizontal } from 'lucide-react';

// --- Dữ liệu Mock ---
const MOCK_WARNINGS = [
    { type: 'Sinh viên', message: 'Trần Thị A có điểm TB 4.2 và tỷ lệ đi học 46%', level: 'danger' },
    { type: 'Tutor', message: 'Tutor Nguyễn Văn A không tham gia giảng dạy 3 buổi', level: 'warning' },
    { type: 'Sinh viên', message: 'Trần Thị B có tỷ lệ đi học 10%', level: 'warning' },
];

const MOCK_STUDENT_PROGRESS = [
    { name: 'Nguyễn Văn A', mssv: '200001', tb: 8.4, attendance: '78%', exercises: '6/7', trend: 'up', status: 'Tốt', statusColor: 'green' },
    { name: 'Nguyễn Văn B', mssv: '200002', tb: 4.9, attendance: '28%', exercises: '0/7', trend: 'down', status: 'Cảnh báo', statusColor: 'red' },
    { name: 'Nguyễn Văn A', mssv: '200001', tb: 10, attendance: '100%', exercises: '11/12', trend: 'up', status: 'Xuất sắc', statusColor: 'green' },
    { name: 'Nguyễn Văn A', mssv: '200001', tb: 7, attendance: '72%', exercises: '8/12', trend: 'down', status: 'Cần chú ý', statusColor: 'yellow' },
];

// --- Components Con ---
const WarningItem: React.FC<typeof MOCK_WARNINGS[0]> = ({ type, message, level }) => (
    <div className={`flex items-center p-3 rounded-md ${level === 'danger' ? 'bg-red-50' : 'bg-yellow-50'}`}>
        <AlertTriangle className={`w-5 h-5 mr-3 ${level === 'danger' ? 'text-red-500' : 'text-yellow-500'}`} />
        <p className="flex-1 text-sm text-gray-700">{message}</p>
        <span className={`text-xs font-medium px-2 py-0.5 rounded ${type === 'Tutor' ? 'bg-gray-200 text-gray-700' : 'bg-blue-100 text-blue-700'}`}>
            {type}
        </span>
    </div>
);

const ProgressBar: React.FC = () => {
    const [activeTab, setActiveTab] = useState('student');

    const getStatusChip = (color: string, text: string) => {
        let colors = 'bg-gray-100 text-gray-700';
        if (color === 'green') colors = 'bg-green-100 text-green-700';
        if (color === 'red') colors = 'bg-red-100 text-red-700';
        if (color === 'yellow') colors = 'bg-yellow-100 text-yellow-700';
        return <span className={`px-2 py-0.5 rounded text-xs font-medium ${colors}`}>{text}</span>;
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
                {/* Tabs */}
                <div className="flex space-x-2 border border-gray-300 rounded-lg p-1">
                    <button 
                        onClick={() => setActiveTab('student')}
                        className={`px-3 py-1 rounded-md text-sm font-medium ${activeTab === 'student' ? 'bg-blue-600 text-white shadow' : 'text-gray-600'}`}
                    >
                        Sinh viên
                    </button>
                    <button 
                         onClick={() => setActiveTab('tutor')}
                        className={`px-3 py-1 rounded-md text-sm font-medium ${activeTab === 'tutor' ? 'bg-blue-600 text-white shadow' : 'text-gray-600'}`}
                    >
                        Tutor
                    </button>
                    <button 
                         onClick={() => setActiveTab('all')}
                        className={`px-3 py-1 rounded-md text-sm font-medium ${activeTab === 'all' ? 'bg-blue-600 text-white shadow' : 'text-gray-600'}`}
                    >
                        Tổng quan
                    </button>
                </div>
                {/* Search */}
                <div className="flex items-center border border-gray-300 rounded-md bg-white p-2 w-72">
                    <Search className="w-4 h-4 text-gray-500 mr-2" />
                    <input type="text" placeholder="Tìm kiếm sinh viên..." className="w-full text-sm focus:outline-none" />
                </div>
            </div>

            {/* Bảng dữ liệu */}
            <div className="overflow-x-auto border rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sinh viên</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Điểm TB</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tỷ lệ đi học</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bài tập</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Xu hướng</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trạng thái</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"></th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {MOCK_STUDENT_PROGRESS.map((student, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="px-6 py-4">
                                    <p className="font-semibold">{student.name}</p>
                                    <p className="text-xs text-gray-500">MSSV: {student.mssv}</p>
                                </td>
                                <td className="px-6 py-4 font-medium">{student.tb}</td>
                                <td className="px-6 py-4">{student.attendance}</td>
                                <td className="px-6 py-4">{student.exercises}</td>
                                <td className="px-6 py-4">
                                    {student.trend === 'up' ? 
                                        <TrendingUp className="w-5 h-5 text-green-500" /> : 
                                        <TrendingDown className="w-5 h-5 text-red-500" />
                                    }
                                </td>
                                <td className="px-6 py-4">
                                    {getStatusChip(student.statusColor, student.status)}
                                </td>
                                <td className="px-6 py-4">
                                    <button className="text-gray-500 hover:text-gray-700"><MoreHorizontal className="w-5 h-5" /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// --- Trang Chính ---
export default function ProgressPage() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-900">Giám sát tiến độ</h2>
                <p className="text-sm text-gray-500">Theo dõi tốc độ học tập của sinh viên và tutor</p>
            </div>
            
            {/* Cảnh báo */}
            <div className="bg-white p-6 rounded-lg shadow-md space-y-3">
                <h3 className="font-semibold text-lg">Cảnh báo bất thường ({MOCK_WARNINGS.length})</h3>
                {MOCK_WARNINGS.map((item, index) => (
                    <WarningItem key={index} {...item} />
                ))}
            </div>

            {/* Bảng tiến độ */}
            <ProgressBar />
        </div>
    );
}
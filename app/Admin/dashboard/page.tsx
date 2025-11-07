// app/Admin/dashboard/page.tsx
'use client';

import React from 'react';
import { UserCheck, Users, BookCopy, ClipboardCheck, Calendar, FileText, Check, X } from 'lucide-react';

// --- Dữ liệu Mock ---
const MOCK_STATS = [
    { title: 'Tổng số Tutor', value: '96', icon: UserCheck, color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Tổng số sinh viên', value: '729', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Tổng số lớp học hiện tại', value: '52', icon: BookCopy, color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Yêu cầu đang chờ xử lý', value: '8', icon: ClipboardCheck, color: 'text-blue-600', bg: 'bg-blue-50' },
];

const MOCK_REQUESTS = [
    { type: 'Đơn xin nghỉ', student: 'SV. Nguyễn Văn A - L01', teacher: 'GV. Nguyễn Văn B', date: '30/10/2025', icon: FileText },
    { type: 'Đơn xin đổi lớp', student: 'SV. Lê Thị B - L01', teacher: 'GV. Nguyễn Văn C', date: '17/10/2025', icon: FileText },
    { type: 'Đăng ký Tutor', student: 'SV. Trần Văn C', date: '9/10/2025', icon: UserCheck },
];

const MOCK_SCHEDULE = [
    { id: 'LG1', time: '8:00 - 11:00', tutor: 'GV. Nguyễn Văn A', students: '25 SV' },
    { id: 'LG2', time: '8:00 - 11:00', tutor: 'GV. Nguyễn Văn B', students: '25 SV' },
    { id: 'LG8', time: '13:00 - 16:50', tutor: 'GV. Nguyễn Văn C', students: '40 SV' },
];

// --- Components Con ---
const StatCard: React.FC<typeof MOCK_STATS[0]> = ({ title, value, icon: Icon, color, bg }) => (
    <div className={`p-5 rounded-lg shadow-md flex items-center space-x-4 ${bg}`}>
        <div className={`p-3 rounded-full ${color} ${bg.replace('-50', '-100')}`}>
            <Icon className="w-6 h-6" />
        </div>
        <div>
            <p className="text-3xl font-bold text-gray-900">{value}</p>
            <p className="text-sm font-medium text-gray-500">{title}</p>
        </div>
    </div>
);

const RequestItem: React.FC<typeof MOCK_REQUESTS[0]> = ({ type, student, teacher, date, icon: Icon }) => (
    <div className="flex items-center p-3 bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-2 bg-gray-100 rounded-lg mr-3">
            <Icon className="w-5 h-5 text-gray-600" />
        </div>
        <div className="flex-1">
            <p className="font-semibold text-gray-800">{type}</p>
            <p className="text-sm text-gray-600">{student} {teacher && `(${teacher})`}</p>
            <p className="text-xs text-gray-400">{date}</p>
        </div>
        <div className="flex space-x-2">
            <button className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">Xem</button>
            <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700">Duyệt</button>
        </div>
    </div>
);

const ScheduleItem: React.FC<typeof MOCK_SCHEDULE[0]> = ({ id, time, tutor, students }) => (
    <div className="p-3 border-l-4 border-blue-500 bg-blue-50 rounded-r-lg">
        <div className="flex justify-between items-center">
            <span className="font-bold text-blue-700">{id} {time}</span>
            <span className="text-sm text-gray-600">{students}</span>
        </div>
        <p className="text-sm text-gray-700">{tutor}</p>
    </div>
);

// --- Trang Chính ---
export default function AdminDashboardPage() {
    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-semibold text-gray-800">Chào mừng trở lại</h2>
            
            {/* Thống kê */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {MOCK_STATS.map((stat, index) => (
                    <StatCard key={index} {...stat} />
                ))}
            </div>

            {/* Yêu cầu và Lịch học */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Cột Yêu cầu (2/3) */}
                <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold">Yêu cầu cần xử lý</h3>
                        <a href="/Admin/request-mgt" className="text-sm text-blue-600 hover:underline">Xem tất cả</a>
                    </div>
                    <div className="space-y-4">
                        {MOCK_REQUESTS.map((item, index) => (
                            <RequestItem key={index} {...item} />
                        ))}
                    </div>
                </div>

                {/* Cột Lịch học (1/3) */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-bold mb-4">Lịch học hôm nay</h3>
                        <div className="space-y-3">
                            {MOCK_SCHEDULE.map(item => (
                                <ScheduleItem key={item.id} {...item} />
                            ))}
                        </div>
                    </div>
                    {/* Cảnh báo bất thường */}
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                        <h4 className="font-semibold text-red-700">Cảnh báo bất thường</h4>
                        <p className="text-sm text-red-600 mt-1">Sinh viên A nghỉ 8 buổi liên tục</p>
                        <p className="text-sm text-red-600 mt-1">Lớp LG2 chưa nộp đánh giá cuối buổi</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
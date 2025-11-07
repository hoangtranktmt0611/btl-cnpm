// app/Sinhvien/dashboard/page.tsx
'use client';

import React from 'react';
import { Clock, CheckCircle, Calendar, User } from 'lucide-react';

// Dữ liệu mock
const MOCK_STATS = [
    { title: 'Tổng buổi học', value: '45', trend: '+5 tháng này', icon: User, color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Buổi học tuần này', value: '12', trend: '3 vào hôm nay', icon: Calendar, color: 'text-green-600', bg: 'bg-green-50' },
    { title: 'Bài kiểm tra', value: '90%', trend: 'Đã hoàn thành', icon: CheckCircle, color: 'text-teal-600', bg: 'bg-teal-50' },
    { title: 'Giờ học tháng này', value: '156', trend: 'Giờ', icon: Clock, color: 'text-orange-600', bg: 'bg-orange-50' },
];

const MOCK_SCHEDULE = [
    { time: '09:00 - 10:30', tutor: 'Nguyễn Văn An', subject: 'Cấu trúc dữ liệu và giải thuật', status: 'Đã hoàn thành', link: 'Chi tiết' },
    { time: '14:00 - 15:30', tutor: 'Trần Thị Bảo', subject: 'Lập trình hướng đối tượng', status: 'Sắp tới', link: 'Xem chi tiết' },
    { time: '16:00 - 17:00', tutor: 'Lê Văn Cường', subject: 'Cơ sở dữ liệu', status: 'Sắp tới', link: 'Tham gia học', isUpcoming: true },
];

// Component Thẻ Thống Kê
const StatCard: React.FC<typeof MOCK_STATS[0]> = ({ title, value, trend, icon: Icon, color, bg }) => (
    <div className={`p-6 rounded-lg shadow-md flex flex-col justify-between ${bg} border-l-4 border-current`} style={{ borderColor: color.replace('text-', '') }}>
        <div className="flex justify-between items-start">
            <h3 className="text-sm font-medium text-gray-500">{title}</h3>
            <Icon className={`w-5 h-5 ${color}`} />
        </div>
        <div className="mt-2">
            <p className="text-3xl font-bold text-gray-900">{value}</p>
            <p className={`text-sm mt-1 ${color}`}>{trend}</p>
        </div>
    </div>
);

// Component Lịch học
const ScheduleItem: React.FC<typeof MOCK_SCHEDULE[0]> = ({ time, tutor, subject, status, link, isUpcoming = false }) => (
    <div className={`p-4 border-l-4 rounded-r-lg mb-4 ${status === 'Sắp tới' ? 'border-blue-500 bg-white shadow-sm' : 'border-gray-300 bg-gray-50'}`}>
        <div className="flex justify-between items-center">
            <div className="flex items-center">
                <Clock className="w-4 h-4 text-blue-500 mr-3 shrink-0" />
                <span className="font-semibold text-gray-800">{time}</span>
            </div>
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${status === 'Đã hoàn thành' ? 'text-green-700 bg-green-100' : 'text-blue-700 bg-blue-100'}`}>
                {status}
            </span>
        </div>
        <div className="ml-7 mt-1">
            <p className="text-sm text-gray-700 flex items-center mb-1">
                <User className="w-4 h-4 mr-2" />
                {tutor}
            </p>
            <p className="text-md font-medium">{subject}</p>
            <div className="mt-3 flex space-x-3">
                {isUpcoming && (
                    <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700">
                        Tham gia học
                    </button>
                )}
                <button className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
                    Xem chi tiết
                </button>
            </div>
        </div>
    </div>
);


export default function DashboardPage() {
    return (
        <div className="space-y-8">
            {/* Thống kê (Stat Cards) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {MOCK_STATS.map((stat, index) => (
                    <StatCard key={index} {...stat} />
                ))}
            </div>

            {/* Lịch học hôm nay */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4 border-b pb-3">
                    <h2 className="text-xl font-bold">Lịch học hôm nay</h2>
                    <span className="text-sm text-gray-500">Thứ Sáu, 07 Tháng 11, 2025</span>
                    <span className="text-sm font-medium px-3 py-1 bg-blue-100 text-blue-700 rounded-full">3 buổi học</span>
                </div>
                
                <div className="space-y-4">
                    {MOCK_SCHEDULE.map((item, index) => (
                        <ScheduleItem key={index} {...item} />
                    ))}
                </div>
            </div>
        </div>
    );
}
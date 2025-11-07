// app/Tutor/dashboard/page.tsx
'use client';

import React from 'react';
import { Clock, Check, X, User, Calendar, Star, Users, Briefcase, MessageSquare } from 'lucide-react';

// --- Dữ liệu Mock ---
const MOCK_STATS = [
    { title: 'Tổng học sinh', value: '45', trend: '+5 tháng này', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Buổi học tuần này', value: '12', trend: '3 vào hôm nay', icon: Briefcase, color: 'text-green-600', bg: 'bg-green-50' },
    { title: 'Đánh giá trung bình', value: '98%', trend: 'Hài lòng', icon: Star, color: 'text-teal-600', bg: 'bg-teal-50' },
    { title: 'Giờ dạy tháng này', value: '156', trend: 'Giờ', icon: Clock, color: 'text-orange-600', bg: 'bg-orange-50' },
];

const MOCK_SCHEDULE = [
    { time: '09:00 - 10:30', student: 'Nguyễn Văn An', subject: 'Cấu trúc dữ liệu và giải thuật', status: 'Đã hoàn thành' },
    { time: '14:00 - 15:30', student: 'Trần Thị Bảo', subject: 'Lập trình hướng đối tượng', status: 'Sắp tới' },
    { time: '16:00 - 17:00', student: 'Lê Văn Cường', subject: 'Cơ sở dữ liệu', status: 'Sắp tới' },
];

const MOCK_ACTIONS = [
    { type: 'Yêu cầu buổi học mới', student: 'Phạm Thị Dung (2110004)', details: '31/10/2025 13:00 - 14:30 (Online)', timeAgo: '30 phút trước', color: 'blue' },
    { type: 'Đánh giá buổi học', student: 'Lê Văn Cường (2110023)', details: 'Giảng viên nhiệt tình', timeAgo: '1 giờ trước', rating: 5, color: 'green' },
    { type: 'Yêu cầu hủy buổi học', student: 'Trần Thị Bảo (2110002)', details: '30/10/2025 10:00 - Bận việc đột xuất', timeAgo: '2 giờ trước', color: 'orange' },
];

// --- Components Con ---
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

const ScheduleItem: React.FC<typeof MOCK_SCHEDULE[0]> = ({ time, student, subject, status }) => (
     <div className={`p-4 border-l-4 rounded-r-lg mb-4 ${status === 'Sắp tới' ? 'border-blue-500 bg-white shadow-sm' : 'border-gray-300 bg-gray-50'}`}>
        <div className="flex justify-between items-center">
            <div className="flex items-center">
                <Clock className="w-4 h-4 text-blue-500 mr-3 shrink-0" />
                <span className="font-semibold text-gray-800">{time}</span>
            </div>
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${status === 'Sắp tới' ? 'text-blue-700 bg-blue-100' : 'text-green-700 bg-green-100'}`}>
                {status}
            </span>
        </div>
        <div className="ml-7 mt-1">
            <p className="text-sm text-gray-700 flex items-center mb-1">
                <User className="w-4 h-4 mr-2" />
                {student}
            </p>
            <p className="text-md font-medium">{subject}</p>
            <div className="mt-3">
                <button className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
                    Xem chi tiết
                </button>
            </div>
        </div>
    </div>
);

const ActionItem: React.FC<typeof MOCK_ACTIONS[0]> = ({ type, student, details, timeAgo, color, rating }) => {
    let icon = <MessageSquare className="text-blue-500" />;
    if (color === 'green') icon = <Star className="text-green-500" />;
    if (color === 'orange') icon = <Clock className="text-orange-500" />;

    return (
        <div className={`p-4 border-l-4 rounded-r-lg bg-white shadow-sm mb-4 border-${color}-500`}>
            <div className="flex items-start space-x-3">
                <div className="shrink-0">{icon}</div>
                <div>
                    <h4 className="text-md font-semibold">{type}</h4>
                    <p className="text-sm font-medium text-gray-700">{student}</p>
                    <p className="text-sm text-gray-500">{details}</p>
                    {rating && (
                        <div className="flex text-yellow-400">
                           {Array(rating).fill(0).map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                        </div>
                    )}
                    <p className="text-xs text-gray-400 mt-1">{timeAgo}</p>
                </div>
            </div>
            <div className="mt-3 flex space-x-2 justify-end">
                {color === 'blue' && (
                    <>
                    <button className="flex items-center px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700">
                        <Check className="w-4 h-4 mr-1" /> Chấp nhận
                    </button>
                    <button className="flex items-center px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
                        <X className="w-4 h-4 mr-1" /> Từ chối
                    </button>
                    </>
                )}
                 {color === 'green' && (
                     <button className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
                        Xem chi tiết
                    </button>
                 )}
                 {color === 'orange' && (
                     <>
                    <button className="px-3 py-1 text-sm bg-orange-500 text-white rounded-md hover:bg-orange-600">
                        Chấp nhận hủy
                    </button>
                    <button className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
                        Liên hệ
                    </button>
                    </>
                 )}
            </div>
        </div>
    );
};

// --- Trang Chính ---
export default function TutorDashboardPage() {
    return (
        <div className="space-y-8">
            {/* Thống kê */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {MOCK_STATS.map((stat, index) => (
                    <StatCard key={index} {...stat} />
                ))}
            </div>

            {/* Lịch và Cần xử lý */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Cột Lịch hôm nay (2/3) */}
                <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
                    <div className="flex justify-between items-center mb-4 border-b pb-3">
                        <h2 className="text-xl font-bold">Lịch hôm nay</h2>
                        <span className="text-sm text-gray-500">Thứ Sáu, 07 Tháng 11, 2025</span>
                        <span className="text-sm font-medium px-3 py-1 bg-blue-100 text-blue-700 rounded-full">3 buổi học</span>
                    </div>
                    <div className="space-y-4">
                        {MOCK_SCHEDULE.map((item, index) => (
                            <ScheduleItem key={index} {...item} />
                        ))}
                    </div>
                </div>

                {/* Cột Cần xử lý (1/3) */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                     <div className="flex justify-between items-center mb-4 border-b pb-3">
                        <h2 className="text-xl font-bold">Cần xử lý</h2>
                        <span className="text-sm font-medium px-3 py-1 bg-red-100 text-red-700 rounded-full">3 mục</span>
                    </div>
                     <div className="space-y-4">
                        {MOCK_ACTIONS.map((item, index) => (
                            <ActionItem key={index} {...item} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
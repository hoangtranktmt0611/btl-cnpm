// app/Sinhvien/dashboard/page.tsx
'use client';

import React from 'react';
import {Users, BookOpen, Video, User, MapPin, Calendar, Clock, Book } from 'lucide-react';

// Dữ liệu mock
const MOCK_STATS = [
    { title: 'Tổng buổi học', value: '45', trend: '+5 tháng này', icon: Users, color: 'text-[#003DA5]', border: 'border-[#003DA5]' },
    { title: 'Buổi học tuần này', value: '12', trend: '3 vào hôm nay', icon: Calendar, color: 'text-[#2B7FFF]', border: 'border-[#2B7FFF]' },
    { title: 'Bài kiểm tra', value: '90%', trend: 'Đã hoàn thành', icon: Book, color: 'text-[#00C950]', border: 'border-[#00C950]' },
    { title: 'Giờ học tháng này', value: '156', trend: 'Giờ', icon: BookOpen, color: 'text-[#FF6900]', border: 'border-[#FF6900]' },
];

const MOCK_SCHEDULE = [
    { time: '09:00 - 10:30', tutor: 'Nguyễn Văn An', subject: 'Cấu trúc dữ liệu và giải thuật', type: 'Online', status: 'Đã hoàn thành', location: 'abc-defj-hig' },
    { time: '14:00 - 15:30', tutor: 'Trần Thị Bảo', subject: 'Lập trình hướng đối tượng', type: 'Offline', status: 'Sắp tới', location: 'H6-608' },
    { time: '16:00 - 17:00', tutor: 'Lê Văn Cường', subject: 'Cơ sở dữ liệu', type: 'Online', status: 'Sắp tới', location: 'abc-defj-hig'},
];  

// Component Thẻ Thống Kê
const StatCard: React.FC<typeof MOCK_STATS[0]> = ({ title, value, trend, icon: Icon, color, border }) => (
    <div className={`bg-white border-l-[5px] ${border} space-y-2 shadow-[0_4px_3px_rgba(0,0,0,0.2)] rounded-xl p-4 space-y-2`} style={{ borderColor: color.replace('text-', '') }}>
        <div className="flex justify-between items-start">
            <h3 className="text-gray-500">{title}</h3>
            <Icon className={`${color}`} />
        </div>
        <div className="space-y-2">
            <p className={`text-3xl font-bold ${color}`}>{value}</p>
            <p className={`text-sm font-regular ${color}`}>{trend}</p>
        </div>
    </div>
);

// Component Lịch học
const ScheduleItem: React.FC<typeof MOCK_SCHEDULE[0]> = ({ time, tutor, subject, status, location, type}) => (
    <div className={`border-[2px] rounded-[10px] p-4 mb-3 ${status === "Đã hoàn thành" ? "bg-[#F9FAFB] border-[#E5E7EB]" : "bg-[#F0F5FF] border-[#DBEAFE]"}`}>
        <div className="space-y-3">
            <div className="flex mb-3 items-center">
                <div className={`flex items-center justify-center mr-3 p-2 rounded-[8px] ${type === 'Online' ? 'bg-[#DBEAFE]' : 'bg-[#DCFCE7]'}`}>
                    {type === "Online" ? (
                        <Video className="text-[#155DFC]" size={30} />
                    ) : (
                        <MapPin className="text-[#00A63E]"size={30} />
                    )}
                </div>

                <div className="flex-1">
                    <div className="flex justify-between items-center space-x-2">
                        <div className="flex items-center space-x-2">
                        <Clock className="text-[#717182]" size={20} />
                        <span className="text-[#003DA5] text-[16px]">{time} </span>
                        </div>
                        <span
                        className={`text-[14px] font-bold rounded-[7px] px-2 py-1 ${
                            status === "Đã hoàn thành" ? "bg-gray-200 text-[#1E2939]" : "bg-[#DBEAFE] text-[#193CB8]"
                        }`}
                        >
                        {status}
                        </span>
                    </div>

                    <div className="flex items-center space-x-2 mb-1">
                        <User className="text-[#717182]" size={20} />
                        <span className="text-[#0A0A0A] text-[16px]">{tutor}</span>
                    </div>

                    <div className="flex items-center space-x-2">
                        {type === "Online" ? (
                        <Video className="text-[#717182]" size={20} />
                        ) : (
                        <MapPin className="text-[#717182]"size={20} />
                        )}
                        <span className="text-[#0A0A0A] text-[16px]">{location}</span>
                    </div>
                </div>                               
            </div>

            <div className="text-[#717182] text-[18px] font-bold">{subject}</div> 
        </div>
    </div>
);


export default function DashboardPage() {
    return (
        <div className="flex-1 pt-4">
            {/* Thống kê (Stat Cards) */}
            <div className="grid grid-cols-4 gap-4">
                {MOCK_STATS.map((stat, index) => (
                    <StatCard key={index} {...stat} />
                ))}
            </div>

            {/* Lịch học hôm nay */}
            <div className="flex-1 bg-white p-6 rounded-xl shadow-[0_4px_3px_rgba(0,0,0,0.2)] mt-4">
                <div className="mb-6">
                    <h2 className="text-[26px] text-[#003DA5] font-bold flex justify-between items-center">
                        Lịch hôm nay
                        <span className="text-sm font-normal text-white bg-[#003DA5] rounded-[10px] px-4 py-1">3 buổi học</span>
                    </h2>
                    <p className="text-[#717182]">Thứ sáu, 07 Tháng 11, 2025</p>                    
                </div>
                
                <div className="space-y-3">
                    {MOCK_SCHEDULE.map((item, index) => (
                        <ScheduleItem key={index} {...item} />
                    ))}
                </div>
            </div>
        </div>
    );
}
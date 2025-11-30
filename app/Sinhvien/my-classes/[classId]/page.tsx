'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';   
import { ArrowLeft, Users, CalendarDays, FileText, Download, PlayCircle, Link as LinkIcon, CalendarIcon, Clock, Eye, Edit } from 'lucide-react';
import { useParams } from 'next/navigation';

export default function MyClassDetailPage() {
    const params = useParams();
    const classId = params.classId;

    const [activeTab, setActiveTab] = useState('lectures');

    const [classInfo, setClassInfo] = useState<any>(null);
    const [lectures, setLectures] = useState<any[]>([]);
    const [quizzes, setQuizzes] = useState<any[]>([]);
    const [schedule, setSchedule] = useState<any[]>([]);

    // -------------------------
    // GỌI API
    // -------------------------
    useEffect(() => {
        if (!classId) return;

        // 1) Lấy thông tin lớp
        fetch(`http://localhost:8080/class/info?classId=${classId}`)
            .then(res => res.json())
            .then(data => setClassInfo(data))
            .catch(() => console.log("Error load class info"));

        // 2) Lấy bài giảng
        fetch(`http://localhost:8080/class/getlistlecture?classId=${classId}`)
            .then(res => res.json())
            .then(data => setLectures(data))
            .catch(() => console.log("Error load lectures"));

        // 3) Lấy bài kiểm tra
        fetch(`http://localhost:8080/class/getlistquiz?classId=${classId}`)
            .then(res => res.json())
            .then(data => setQuizzes(data))
            .catch(() => console.log("Error load quizzes"));
        // 4) Lấy lịch hẹn
        fetch(`http://localhost:8080/class/getlistlich?classId=${classId}`)
            .then(res => res.json())
            .then(data => setSchedule(data))
            .catch(() => console.log("Error load schedules"));
            
    }, [classId]);

    // Loading
    if (!classInfo) return <p className="text-center p-10">Đang tải...</p>;

    return (
        <div className="bg-white py-6 px-12 rounded-[10px] shadow-[0_4px_3px_rgba(0,0,0,0.2)] mt-3">
            <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6 ">
                
                {/* CONTENT */}
                <div className="flex-1">
                    <div className="mb-6">
                        <Link href="/Sinhvien/my-classes" className="flex items-center text-[#797B7F] hover:text-gray-800 text-sm mb-2">
                            <ArrowLeft className="w-4 h-4 mr-1" /> Trở về Lớp học của tôi
                        </Link>

                        <h2 className="text-3xl font-bold text-gray-900">
                            {classInfo.courseName} ({classId})
                        </h2>
                        <p className="text-md text-gray-500">{classInfo.description}</p>
                    </div>

                    {/* TAB */}
                    <div className="border-b border-gray-200 mb-6">
                        <nav className="flex space-x-6">
                            <button
                                onClick={() => setActiveTab('lectures')}
                                className={`w-full px-6 py-3 font-medium text-[14px] transition cursor-pointer ${activeTab === 'lectures' ? 'text-[#4BA4E3] border-b-2 border-[#4BA4E3]' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                Bài giảng & Tài liệu
                            </button>
                            <button
                                onClick={() => setActiveTab('quizzes')}
                                className={`w-full px-6 py-3 font-medium text-[14px] transition cursor-pointer ${activeTab === 'quizzes' ? 'text-[#4BA4E3] border-b-2 border-[#4BA4E3]' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                Bài kiểm tra
                            </button>
                            <button
                                onClick={() => setActiveTab('schedule')}
                                className={`w-full px-6 py-3 font-medium text-[14px] transition cursor-pointer ${activeTab === 'schedule' ? 'text-[#4BA4E3] border-b-2 border-[#4BA4E3]' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                Lịch hẹn
                            </button>
                        </nav>
                    </div>

                    {/* TAB CONTENT */}
                    {activeTab === 'lectures' && (
                        <div className="space-y-4">
                            <p className="text-gray-600 font-semibold">{lectures.length} tài liệu</p>

                            {lectures.map((item, i) => (
                                <LectureItem key={i} {...item} />
                            ))}
                        </div>
                    )}

                    {activeTab === 'quizzes' && (
                        <div className="space-y-4">
                            <p className="text-gray-600 font-semibold">{quizzes.length} bài kiểm tra</p>

                            {quizzes.map((item, i) => (
                                <QuizItem key={i} {...item} />
                            ))}
                        </div>
                    )}

                    {activeTab === 'schedule' && (
                        <div className="space-y-4">
                            <p className="text-gray-600 font-semibold">{schedule.length} lịch hẹn</p>

                            {schedule.map((item, i) => (
                                <ScheduleItem key={i} {...item} />
                            ))}
                        </div>
                    )}
                </div>

                {/* SIDEBAR */}
                <div className="w-full lg:w-80 shrink-0">
                    <CourseInfoSidebar info={classInfo} />
                </div>
            </div>
        </div>
    );
}

// --------------------------------------
// COMPONENTS
// --------------------------------------

const CourseInfoSidebar = ({ info }: any) => (
    <div className="bg-white rounded-[10px] shadow-[0_0_3px_rgba(0,0,0,0.3)] overflow-hidden mb-6">
        <div className="h-25 w-full bg-[#4BA4E3]" />
        <div className='p-4 space-y-2'>
            <h3 className="font-bold text-lg text-black">{info.courseName}</h3>
            <p className="text-sm text-gray-500">{info.description}</p>
            <p>Mã Lớp: <span className="font-semibold">{info.maLop}</span></p>
            <div className="space-y-2 text-sm text-gray-500">
                <p className="flex items-center"><Users className="w-4 h-4 mr-2 text-[#4BA4E3]" /> {info.soSinhVien} Sinh viên</p>
                <p className="flex items-center"><FileText className="w-4 h-4 mr-2 text-[#4BA4E3]" /> {info.soBaiGiang} Bài giảng</p>
            </div>
        </div>
    </div>
);

const LectureItem = ({ type, title, desc }: any) => {
    let IconComponent = FileText;
    let iconColor = 'text-[#2B7FFF]';
    if (type === 'video') {
        IconComponent = PlayCircle;
        iconColor = 'text-[#FF6900]';
    } else if (type === 'link') {
        IconComponent = LinkIcon;
        iconColor = 'text-[#B215AD]';
    }
    return (
        <div className="flex justify-between items-center p-4 bg-white rounded-[10px] shadow-[0_0_3px_rgba(0,0,0,0.2)]">
            <div className="flex items-center space-x-4">
                <IconComponent className={`w-6 h-6 ${iconColor} shrink-0`} />
                <div>
                    <p className="font-semibold text-gray-800">{title}</p>
                    <p className="text-sm text-gray-500">{desc}</p>
                </div>
            </div>

            <div className="flex space-x-3 text-sm shrink-0">
                <button className="flex items-center text-[#4BA4E3] px-3 py-1 border border-[#4BA4E3] rounded-[10px] cursor-pointer hover:bg-[#EBF7FF]">
                    <Eye className="w-4 h-4 mr-1" /> Xem
                </button>
                <button className="flex items-center text-[#4BA4E3] px-3 py-1 border border-[#4BA4E3] rounded-[10px] cursor-pointer hover:bg-[#EBF7FF]">
                    <Download className="w-4 h-4 mr-1" /> Tải về
                </button>
            </div>
        </div>
    );
};

const QuizItem = ({ name, status, date, duration, questions, isAvailable }: any) => (
    <div className="p-4 bg-white rounded-[10px] shadow-[0_0_3px_rgba(0,0,0,0.2)] space-y-4">
        <div className="flex justify-between items-start">
            <h4 className="text-lg font-semibold text-gray-800">{name}</h4>
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${status == "Đang mở" ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-600'}`}>
                {status}
            </span>
        </div>        
        <p className="flex items-center text-sm text-gray-500">
            <CalendarIcon className="w-4 h-4 mr-1 text-gray-600" /> 
            {date}
        </p>
        <p className="flex items-center text-sm text-gray-500">
            <Clock className="w-4 h-4 mr-1 text-gray-600" /> 
            {duration}
        </p>        
        <div className="border border-b-[1px] rounded-[10px] border-gray-200 mt-3"></div>
        <div className="mt-4 flex justify-between items-center space-x-2"> 
            <button className="flex flex-1 items-center justify-center px-2 py-1 text-sm text-[#4BA4E3] border border-[#4BA4E3] rounded-[8px] hover:bg-[#EBF7FF] cursor-pointer">
                <Eye size={14} className="mr-1 relative top-[-1px]"/> Xem kết quả
            </button> 
            <button className="flex flex-1 items-center justify-center px-2 py-1 text-sm bg-white text-[#4BA4E3] border border-[#4BA4E3] rounded-[8px] hover:bg-[#EBF7FF] cursor-pointer">
                <Edit size={14} className="mr-1 relative top-[-1px]" /> Làm bài
            </button>
        </div>
    </div>
);

const ScheduleItem = ({ title, date, time, status }: any) => (
    <div className="flex justify-between items-center p-4 bg-white rounded-[10px] shadow-[0_0_3px_rgba(0,0,0,0.2)]">
        <div className="flex items-center space-x-4">
            <div className="w-15 h-15 bg-[#4BA4E3] rounded-[8px]">
            </div>
            <div className="space-y-2">
                <p className="font-semibold text-gray-800">{title}</p>
                <div className="flex items-center text-gray-500 space-x-8">
                    <div className="flex items-center space-x-2">
                        <CalendarDays size={14} className="relative top-[-2px]"/>
                        <p className="text-sm">{date}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Clock size={14} className="relative top-[-1px]"/>
                        <p className="text-sm">{time}</p>
                    </div>
                </div>                        
            </div>
        </div>
        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${status === 'Đã hoàn thành' ? 'bg-gray-100 text-gray-600' : 'bg-yellow-100 text-yellow-700'}`}>
            {status}
        </span>
    </div>
);

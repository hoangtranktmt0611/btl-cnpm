// app/Sinhvien/my-classes/[classId]/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Book, CheckCircle, FileText, Download, PlayCircle, Link as LinkIcon, Users, Clock } from 'lucide-react';
import { useParams } from 'next/navigation';

// --- Dữ liệu Mock ---
const COURSE_INFO = {
    courseName: 'Công nghệ Phần mềm',
    courseCode: '(CO3001)',
    description: "Let's learn about colors, color contrast and color styles...",
    maLop: '251001',
    soSinhVien: 30,
    soBaiGiang: 5,
};

// Dữ liệu cho Tab "Bài giảng & Tài liệu"
const LECTURE_DATA = [
    { type: 'file', title: 'Chương 1: Giới thiệu về Color Styles', desc: 'Tài liệu giới thiệu cơ bản về color styles và design system', icon: FileText },
    { type: 'file', title: 'Chương 2: Typography và Font System', desc: 'Hướng dẫn sử dụng typography trong thiết kế', icon: FileText },
    { type: 'video', title: 'Video bài giảng: Design Principles', desc: 'Video hướng dẫn về các nguyên tắc thiết kế cơ bản', icon: PlayCircle },
    { type: 'link', title: 'Tài liệu tham khảo: UI Components', desc: 'Bộ tài liệu về các component UI phổ biến', icon: LinkIcon },
    { type: 'file', title: 'Chương 3: Layout và Spacing', desc: 'Tài liệu về cách thiết kế layout và sử dụng spacing', icon: FileText },
];

// Dữ liệu cho Tab "Bài kiểm tra"
const QUIZ_DATA = [
    { name: 'Kiểm tra giữa kỳ - Design Fundamentals', status: 'Đang mở', date: 'Hạn: 15/12/2025 23:59', duration: '60 phút', questions: '20 câu hỏi', isAvailable: true },
    { name: 'Bài tập tuần 3 - Layout Design', status: 'Đã kết thúc', date: 'Hạn: 08/12/2025 23:59', duration: '45 phút', questions: '15 câu hỏi', isAvailable: false },
];

// --- Components Con ---

// Sidebar thông tin khóa học bên phải
const CourseInfoSidebar: React.FC = () => (
    <div className="p-4 bg-white rounded-lg shadow-md sticky top-28 space-y-4">
        {/* Khối Color Styles */}
        <div className="bg-amber-50 p-4 rounded-md border-t-4 border-amber-500">
            <div className="flex items-center space-x-3">
                 <div className="w-10 h-10 bg-white border border-gray-300 rounded flex flex-wrap shrink-0">
                    {[...Array(8)].map((_, i) => (
                         <div key={i} className={`w-1/4 h-1/4 ${i % 2 === 0 ? 'bg-amber-600' : 'bg-gray-600'}`}></div>
                    ))}
                </div>
                <div>
                    <p className="font-bold text-gray-800 text-sm">Color Styles</p>
                    <p className="text-xs text-gray-600">Let's learn about colors, color contrast...</p>
                </div>
            </div>
        </div>

        <h3 className="font-bold text-lg text-blue-600">{COURSE_INFO.courseName} {COURSE_INFO.courseCode}</h3>
        <p className="text-sm text-gray-500">{COURSE_INFO.description}</p>
        
        <div className="space-y-2 text-sm text-gray-700">
            <p>Mã Lớp: <span className="font-semibold">{COURSE_INFO.maLop}</span></p>
            <p className="flex items-center"><Users className="w-4 h-4 mr-2 text-gray-400" /> {COURSE_INFO.soSinhVien} Sinh viên</p>
            <p className="flex items-center"><Book className="w-4 h-4 mr-2 text-gray-400" /> {COURSE_INFO.soBaiGiang} Bài giảng</p>
        </div>
    </div>
);

// Item Bài giảng/Tài liệu
const LectureItem: React.FC<typeof LECTURE_DATA[0]> = ({ type, title, desc, icon: Icon }) => (
    <div className="flex justify-between items-center p-4 bg-white rounded-lg border-b hover:bg-gray-50 transition">
        <div className="flex items-center space-x-4">
            <Icon className={`w-6 h-6 ${type === 'video' ? 'text-red-500' : type === 'link' ? 'text-purple-500' : 'text-blue-500'} shrink-0`} />
            <div>
                <p className="font-semibold text-gray-800">{title}</p>
                <p className="text-sm text-gray-500">{desc}</p>
            </div>
        </div>
        <div className="flex space-x-3 text-sm shrink-0">
            <button className="text-blue-600 hover:underline">Xem</button>
            <span className="text-gray-300">|</span>
            <button className="text-blue-600 hover:underline flex items-center">
                <Download className="w-4 h-4 mr-1" /> Tải về
            </button>
        </div>
    </div>
);

// Item Bài kiểm tra/Bài tập
const QuizItem: React.FC<typeof QUIZ_DATA[0]> = ({ name, status, date, duration, questions, isAvailable }) => (
    <div className="p-5 bg-white rounded-lg border shadow-sm mb-4">
        <div className="flex justify-between items-start">
            <h4 className="text-lg font-semibold text-gray-800">{name}</h4>
            <span className={`text-xs font-medium px-3 py-1 rounded-full ${isAvailable ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                {status}
            </span>
        </div>
        
        <div className="flex space-x-4 text-sm text-gray-600 mt-2">
            <p className="flex items-center"><CheckCircle className="w-4 h-4 mr-1 text-gray-400" /> {questions}</p>
            <p className="flex items-center"><Clock className="w-4 h-4 mr-1 text-gray-400" /> {duration}</p>
        </div>
        <p className="text-sm text-red-500 mt-1">{date}</p>

        <div className="mt-4">
            <button className={`px-4 py-2 text-sm rounded-md shadow-sm transition 
                ${isAvailable ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-300 text-gray-700 cursor-not-allowed'}
            `}>
                Xem kết quả
            </button>
        </div>
    </div>
);

// --- Trang Chi tiết chính ---
export default function MyClassDetailPage() {
    const params = useParams(); // Lấy classId từ URL
    const [activeTab, setActiveTab] = useState('lectures'); // 'lectures', 'quizzes', 'schedule'

    return (
        // Bố cục 2 cột
        <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
            
            {/* Cột chính (Tabbed Content) */}
            <div className="flex-1">
                <div className="mb-6">
                    <Link href="/Sinhvien/my-classes" className="flex items-center text-blue-600 hover:text-blue-800 text-sm mb-2">
                        <ArrowLeft className="w-4 h-4 mr-1" /> Trở về Lớp học của tôi
                    </Link>
                    <h2 className="text-3xl font-bold text-gray-900">{COURSE_INFO.courseName} ({params.classId})</h2>
                    <p className="text-md text-gray-500">{COURSE_INFO.description}</p>
                </div>

                {/* Tab Navigation */}
                <div className="border-b border-gray-200 mb-6">
                    <nav className="flex space-x-6" aria-label="Tabs">
                        <button
                            onClick={() => setActiveTab('lectures')}
                            className={`px-1 py-2 font-medium text-sm transition ${activeTab === 'lectures' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            Bài giảng & Tài liệu
                        </button>
                        <button
                            onClick={() => setActiveTab('quizzes')}
                            className={`px-1 py-2 font-medium text-sm transition ${activeTab === 'quizzes' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            Bài kiểm tra
                        </button>
                        <button
                            onClick={() => setActiveTab('schedule')}
                            className={`px-1 py-2 font-medium text-sm transition ${activeTab === 'schedule' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            Lịch hẹn
                        </button>
                    </nav>
                </div>

                {/* Tab Content */}
                {activeTab === 'lectures' && (
                    <div className="space-y-4">
                        <p className="text-gray-600 mb-4 font-semibold">{LECTURE_DATA.length} tài liệu</p>
                        {LECTURE_DATA.map((item, index) => (
                            <LectureItem key={index} {...item} />
                        ))}
                    </div>
                )}

                {activeTab === 'quizzes' && (
                    <div className="space-y-4">
                        <p className="text-gray-600 mb-4 font-semibold">{QUIZ_DATA.length} bài kiểm tra</p>
                        {QUIZ_DATA.map((item, index) => (
                            <QuizItem key={index} {...item} />
                        ))}
                    </div>
                )}

                {activeTab === 'schedule' && (
                    <div className="p-6 bg-white rounded-lg shadow-md">
                        <h3 className="font-semibold text-xl">Lịch hẹn của lớp học</h3>
                        <p className="text-gray-500 mt-2">Nội dung lịch hẹn sẽ được tích hợp từ FullCalendar.</p>
                        {/* Bạn có thể đặt một component FullCalendar khác ở đây, lọc theo classId */}
                    </div>
                )}
            </div>
            
            {/* Cột phụ (Course Info Sidebar) */}
            <div className="w-full lg:w-80 shrink-0">
                <CourseInfoSidebar />
            </div>
        </div>
    );
}
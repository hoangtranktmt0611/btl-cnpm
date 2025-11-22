'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Book, CheckCircle, FileText, Download, PlayCircle, Link as LinkIcon, Users, Clock } from 'lucide-react';
import { useParams } from 'next/navigation';

export default function MyClassDetailPage() {
    const params = useParams();
    const classId = 1;

    const [activeTab, setActiveTab] = useState('lectures');

    const [classInfo, setClassInfo] = useState<any>(null);
    const [lectures, setLectures] = useState<any[]>([]);
    const [quizzes, setQuizzes] = useState<any[]>([]);

    // -------------------------
    // GỌI API
    // -------------------------
    useEffect(() => {
        if (!classId) return;

        // 1) Lấy thông tin lớp
        fetch(`http://localhost:8080/api/sinhvien/getclassinfo?classId=${classId}`)
            .then(res => res.json())
            .then(data => setClassInfo(data))
            .catch(() => console.log("Error load class info"));

        // 2) Lấy bài giảng
        fetch(`http://localhost:8080/api/sinhvien/getlectures?classId=${classId}`)
            .then(res => res.json())
            .then(data => setLectures(data))
            .catch(() => console.log("Error load lectures"));

        // 3) Lấy bài kiểm tra
        fetch(`http://localhost:8080/api/sinhvien/getquizzes?classId=${classId}`)
            .then(res => res.json())
            .then(data => setQuizzes(data))
            .catch(() => console.log("Error load quizzes"));
    }, [classId]);

    // Loading
    if (!classInfo) return <p className="text-center p-10">Đang tải...</p>;

    return (
        <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
            
            {/* CONTENT */}
            <div className="flex-1">
                <div className="mb-6">
                    <Link href="/Sinhvien/my-classes" className="flex items-center text-blue-600 hover:text-blue-800 text-sm mb-2">
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
                            className={`px-1 py-2 font-medium text-sm ${activeTab === 'lectures' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                        >
                            Bài giảng & Tài liệu
                        </button>
                        <button
                            onClick={() => setActiveTab('quizzes')}
                            className={`px-1 py-2 font-medium text-sm ${activeTab === 'quizzes' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                        >
                            Bài kiểm tra
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
            </div>

            {/* SIDEBAR */}
            <div className="w-full lg:w-80 shrink-0">
                <CourseInfoSidebar info={classInfo} />
            </div>
        </div>
    );
}

// --------------------------------------
// COMPONENTS
// --------------------------------------

const CourseInfoSidebar = ({ info }: any) => (
    <div className="p-4 bg-white rounded-lg shadow-md sticky top-28 space-y-4">
        <h3 className="font-bold text-lg text-blue-600">{info.courseName}</h3>
        <p className="text-sm text-gray-500">{info.description}</p>

        <p>Mã lớp: {info.maLop}</p>
        <p>Sinh viên: {info.soSinhVien}</p>
        <p>Bài giảng: {info.soBaiGiang}</p>
    </div>
);

const LectureItem = ({ type, title, desc }: any) => {
    const Icon = type === 'video' ? PlayCircle : type === 'link' ? LinkIcon : FileText;
    return (
        <div className="flex justify-between items-center p-4 bg-white rounded-lg border-b hover:bg-gray-50">
            <div className="flex items-center space-x-4">
                <Icon className="w-6 h-6 text-blue-500" />
                <div>
                    <p className="font-semibold">{title}</p>
                    <p className="text-sm text-gray-500">{desc}</p>
                </div>
            </div>
        </div>
    );
};

const QuizItem = ({ name, status, date, duration, questions, isAvailable }: any) => (
    <div className="p-5 bg-white rounded-lg border shadow-sm mb-4">
        <div className="flex justify-between items-start">
            <h4 className="text-lg font-semibold">{name}</h4>
            <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-700">{status}</span>
        </div>
        <p className="text-sm text-gray-600 mt-2">{questions}</p>
        <p className="text-sm text-red-500 mt-1">{date}</p>
    </div>
);

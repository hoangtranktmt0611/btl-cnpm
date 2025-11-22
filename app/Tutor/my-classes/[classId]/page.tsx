'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
    ArrowLeft, Book, FileText, Download, PlayCircle, Link as LinkIcon, Users, Clock, 
    Plus, Edit, Trash2, Send, Settings, Calendar as CalendarIcon, List, Eye
} from 'lucide-react';

// Import các modal mới
import AddLectureModal from '@/components/AddLectureModal';
import AddScheduleModal from '@/components/AddScheduleModal';
import SendNotificationModal from '@/components/SendNotificationModal';
import ManageMaterialsModal from '@/components/ManageMaterialsModal';


export default function TutorClassDetailPage() {
    const params = useParams(); 
    const classId = Number(1);

    const [courseInfo, setCourseInfo] = useState<any>(null);
    const [lectures, setLectures] = useState<any[]>([]);
    const [quizzes, setQuizzes] = useState<any[]>([]);
    const [schedule, setSchedule] = useState<any[]>([]);
    const [students, setStudents] = useState<any[]>([]);

    const [activeTab, setActiveTab] = useState('lectures');

    // States modal
    const [isLectureModalOpen, setIsLectureModalOpen] = useState(false);
    const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
    const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
    const [isManageModalOpen, setIsManageModalOpen] = useState(false);

    useEffect(() => {
        if (!classId) return;

        const fetchData = async () => {
            try {
                // 1. Course info
                const resInfo = await fetch(`http://localhost:8080/class/info?classId=${classId}`);
                if (!resInfo.ok) throw new Error('Failed to fetch class info');
                const infoData = await resInfo.json();
                setCourseInfo(infoData);

                // 2. Lectures
                const resLectures = await fetch(`http://localhost:8080/class/getlistlecture?classId=${classId}`);
                if (!resLectures.ok) throw new Error('Failed to fetch lectures');
                setLectures(await resLectures.json());

                // 3. Quizzes
                const resQuizzes = await fetch(`http://localhost:8080/class/getlistquiz?classId=${classId}`);
                if (!resQuizzes.ok) throw new Error('Failed to fetch quizzes');
                setQuizzes(await resQuizzes.json());

                // 4. Schedule
                const resSchedule = await fetch(`http://localhost:8080/class/getlistlich?classId=${classId}`);
                if (!resSchedule.ok) throw new Error('Failed to fetch schedule');
                setSchedule(await resSchedule.json());

                // 5. Students
                const resStudents = await fetch(`http://localhost:8080/class/getlistsinhvien?classId=${classId}`);
                if (!resStudents.ok) throw new Error('Failed to fetch students');
                setStudents(await resStudents.json());

            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, [classId]);

    // --- Components con như Sidebar & Tabs ---
    const CourseInfoSidebar: React.FC<any> = ({ onOpenSchedule, onOpenNotification, onOpenManage }) => {
        if (!courseInfo) return null;
        return (
            <div className="p-4 bg-white rounded-lg shadow-md sticky top-28 space-y-4">
                <h3 className="font-bold text-lg text-blue-600">{courseInfo.courseName} {courseInfo.courseCode}</h3>
                <p>Mã Lớp: <span className="font-semibold">{courseInfo.maLop}</span></p>
                <div className="space-y-2 text-sm text-gray-700">
                    <p className="flex items-center"><Users className="w-4 h-4 mr-2 text-gray-400" /> {courseInfo.soSinhVien} Sinh viên</p>
                    <p className="flex items-center"><Book className="w-4 h-4 mr-2 text-gray-400" /> {courseInfo.soBaiGiang} Bài giảng</p>
                </div>
                <div className="pt-4 border-t space-y-2">
                    <button onClick={onOpenSchedule} className="w-full flex items-center text-sm p-2 text-blue-600 rounded-md hover:bg-blue-50 border border-blue-200">
                        <CalendarIcon className="w-4 h-4 mr-2" /> Thiết lập lịch hẹn
                    </button>
                    <button onClick={onOpenNotification} className="w-full flex items-center text-sm p-2 text-blue-600 rounded-md hover:bg-blue-50 border border-blue-200">
                        <Send className="w-4 h-4 mr-2" /> Gửi thông báo
                    </button>
                    <button onClick={onOpenManage} className="w-full flex items-center text-sm p-2 text-blue-600 rounded-md hover:bg-blue-50 border border-blue-200">
                        <Settings className="w-4 h-4 mr-2" /> Quản lý tài liệu
                    </button>
                </div>
            </div>
        );
    };

    const renderTabContent = () => {
        switch(activeTab) {
            case 'lectures': return (
                <div className="space-y-4">
                    <p className="text-gray-600 font-semibold">{lectures.length} tài liệu</p>
                    {lectures.map((item, index) => (
                        <div key={index} className="flex justify-between items-center p-4 bg-white rounded-lg border-b hover:bg-gray-50 transition">
                            <div className="flex items-center space-x-4">
                                <FileText className="w-6 h-6 text-blue-500 shrink-0" />
                                <div>
                                    <p className="font-semibold text-gray-800">{item.title}</p>
                                    <p className="text-sm text-gray-500">{item.desc}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            );
            case 'quizzes': return (
                <div className="space-y-4">
                    <p className="text-gray-600 font-semibold">{quizzes.length} bài kiểm tra</p>
                    {quizzes.map((item, index) => (
                        <div key={index} className="p-5 bg-white rounded-lg border shadow-sm mb-4">
                            <div className="flex justify-between items-start">
                                <h4 className="text-lg font-semibold text-gray-800">{item.name}</h4>
                                <span className={`text-xs font-medium px-3 py-1 rounded-full ${item.isAvailable ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                                    {item.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            );
            case 'schedule': return (
                <div className="space-y-4">
                    <p className="text-gray-600 font-semibold">{schedule.length} lịch hẹn</p>
                    {schedule.map((item, index) => (
                        <div key={index} className="flex justify-between items-center p-4 bg-white rounded-lg border-l-4 border-blue-500 shadow-sm">
                            <div className="flex items-center space-x-4">
                                <CalendarIcon className="w-5 h-5 text-blue-600" />
                                <div>
                                    <p className="font-semibold text-gray-800">{item.title}</p>
                                    <p className="text-sm text-gray-500">{item.date} • {item.time}</p>
                                </div>
                            </div>
                            <span className={`text-xs font-medium px-3 py-1 rounded-full ${item.status === 'Sắp tới' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                                {item.status}
                            </span>
                        </div>
                    ))}
                </div>
            );
            case 'students': return (
                <div className="bg-white rounded-lg shadow-md overflow-hidden border">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th>MSSV</th><th>Họ và Tên</th><th>Email</th><th>Tiến độ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map(student => (
                                <tr key={student.id} className="hover:bg-gray-50">
                                    <td>{student.id}</td>
                                    <td>{student.name}</td>
                                    <td>{student.email}</td>
                                    <td>
                                        <div className="w-32 bg-gray-200 rounded-full h-2">
                                            <div className={`h-2 rounded-full ${student.progress > 80 ? 'bg-green-500' : student.progress > 50 ? 'bg-blue-500' : 'bg-yellow-500'}`} style={{ width: `${student.progress}%` }}></div>
                                        </div>
                                        <span className="text-sm">{student.progress}%</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
            default: return null;
        }
    };

    const TabButton: React.FC<{ name: string; label: string; }> = ({ name, label }) => (
         <button
            onClick={() => setActiveTab(name)}
            className={`px-3 py-2 font-medium text-sm transition ${activeTab === name ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
        >
            {label}
        </button>
    );

    if (!courseInfo) return <p>Loading...</p>;

    return (
        <>
            <AddLectureModal isOpen={isLectureModalOpen} onClose={() => setIsLectureModalOpen(false)} />
            <AddScheduleModal isOpen={isScheduleModalOpen} onClose={() => setIsScheduleModalOpen(false)} />
            <SendNotificationModal isOpen={isNotificationModalOpen} onClose={() => setIsNotificationModalOpen(false)} courseName={`${courseInfo.courseName} (${classId})`} />
            <ManageMaterialsModal isOpen={isManageModalOpen} onClose={() => setIsManageModalOpen(false)} onAddNew={() => { setIsManageModalOpen(false); setIsLectureModalOpen(true); }} />

            <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
                <div className="flex-1">
                    <Link href="/Tutor/my-classes" className="flex items-center text-blue-600 hover:text-blue-800 text-sm mb-2">
                        <ArrowLeft className="w-4 h-4 mr-1" /> Trở về Lớp học của tôi
                    </Link>
                    <h2 className="text-3xl font-bold text-gray-900">{courseInfo.courseName} ({classId})</h2>
                    <p className="text-md text-gray-500">{courseInfo.description}</p>

                    <div className="border-b border-gray-200 mb-6">
                        <nav className="flex space-x-6" aria-label="Tabs">
                            <TabButton name="lectures" label="Bài giảng & Tài liệu" />
                            <TabButton name="quizzes" label="Bài kiểm tra" />
                            <TabButton name="schedule" label="Lịch hẹn" />
                            <TabButton name="students" label="Danh sách Sinh viên" />
                        </nav>
                    </div>

                    {renderTabContent()}
                </div>

                <div className="w-full lg:w-80 shrink-0">
                    <CourseInfoSidebar 
                        onOpenSchedule={() => setIsScheduleModalOpen(true)}
                        onOpenNotification={() => setIsNotificationModalOpen(true)}
                        onOpenManage={() => setIsManageModalOpen(true)}
                    />
                </div>
            </div>
        </>
    );
}

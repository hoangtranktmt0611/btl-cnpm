// app/Tutor/my-classes/[classId]/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
    ArrowLeft, FileText, Download, PlayCircle, Link as LinkIcon, Users, Clock, Search,
    Plus, Edit, Trash2, Send, Calendar as CalendarIcon, List, Eye, Upload, CalendarDays
} from 'lucide-react';
import { useParams } from 'next/navigation';

// Import các modal mới
import AddLectureModal from '@/components/AddLectureModal';
import AddScheduleModal from '@/components/AddScheduleModal';
import SendNotificationModal from '@/components/SendNotificationModal';
import ManageMaterialsModal from '@/components/ManageMaterialsModal';
// --- Components Con (Định nghĩa bên trong page) ---

// Sidebar thông tin (CẬP NHẬT với "Hành động nhanh")
const CourseInfoSidebar: React.FC<{
    data: any;
    onOpenSchedule: () => void;
    onOpenNotification: () => void;
    onOpenManage: () => void;
}> = ({ data, onOpenSchedule, onOpenNotification, onOpenManage }) => (
    <div className="">
        <div className="bg-white rounded-[10px] shadow-[0_0_3px_rgba(0,0,0,0.3)] overflow-hidden mb-6">
            <div className="h-25 w-full bg-[#4BA4E3]" />
            <div className='p-4 space-y-4'>
                <h3 className="font-bold text-lg text-black">{data.courseName} ({data.courseCode})</h3>
                <p>Mã Lớp: <span className="font-semibold">{data.classId}</span></p>
                <div className="space-y-2 text-sm text-gray-500">
                    <p className="flex items-center"><Users className="w-4 h-4 mr-2 text-[#4BA4E3]" /> {data.totalStudent} Sinh viên</p>
                    <p className="flex items-center"><FileText className="w-4 h-4 mr-2 text-[#4BA4E3]" /> {data.totalLecture} Bài giảng</p>
                </div>
            </div>
        </div>
        <div className="p-4 bg-white rounded-[10px] shadow-[0_0_3px_rgba(0,0,0,0.3)]">
            <h4 className="font-semibold mb-3">Hành động nhanh</h4>
            <div className="space-y-2">
                <button 
                    onClick={onOpenSchedule}
                    className="w-full flex items-center text-sm p-2 text-[#4BA4E3] rounded-[10px] hover:bg-[#EBF7FF] border border-[#4BA4E3] cursor-pointer"
                >
                    <CalendarIcon className="w-4 h-4 mr-2" /> Thiết lập lịch hẹn
                </button>
                <button 
                    onClick={onOpenNotification}
                    className="w-full flex items-center text-sm p-2 text-[#4BA4E3] rounded-[10px] hover:bg-[#EBF7FF] border border-[#4BA4E3] cursor-pointer"
                >
                    <Send className="w-4 h-4 mr-2" /> Gửi thông báo cho tất cả sinh viên
                </button>
                <button 
                    onClick={onOpenManage}
                    className="w-full flex items-center text-sm p-2 text-[#4BA4E3] rounded-[10px] hover:bg-[#EBF7FF] border border-[#4BA4E3] cursor-pointer"
                >
                    <Upload className="w-4 h-4 mr-2" /> Quản lý tài liệu
                </button>
            </div>
        </div>
    </div>
);

// Tab 1: Bài giảng & Tài liệu (CẬP NHẬT)
const TabLectures: React.FC<{ lecture: any[]; onOpenLectureModal: () => void }> = ({ lecture, onOpenLectureModal }) => (
    <div className="space-y-4">
        <div className="flex justify-between items-center mb-4">
            <p className="text-gray-600 font-semibold">{lecture.length} bài giảng & tài liệu</p>
            <button 
                onClick={onOpenLectureModal}
                className="flex items-center p-2 bg-[#4BA4E3] text-white rounded-[10px] text-sm cursor-pointer shadow-sm hover:bg-[#227FC2]"
            >
                <Plus className="w-4 h-4 mr-1" /> Thêm bài giảng / tài liệu mới
            </button>
        </div>

        {lecture.map((item, index) => {            
            let IconComponent = FileText;
            let iconColor = 'text-[#2B7FFF]';
            if (item.type === 'video') {
                IconComponent = PlayCircle;
                iconColor = 'text-[#FF6900]';
            } else if (item.type === 'link') {
                IconComponent = LinkIcon;
                iconColor = 'text-[#B215AD]';
            }
            return (
                <div key={index} className="flex justify-between items-center p-4 bg-white rounded-[10px] shadow-[0_0_3px_rgba(0,0,0,0.2)]">
                    <div className="flex items-center space-x-4">                         
                        <IconComponent className={`w-6 h-6 ${iconColor} shrink-0`} />                         
                        <div>
                            <p className="font-semibold text-gray-800">{item.title}</p>
                            <p className="text-sm text-gray-500">{item.desc}</p>
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
        })}
    </div>
);

// Tab 2: Bài kiểm tra (CẬP NHẬT)
const TabQuizzes: React.FC<{ quiz: any[] }> = ({ quiz }) => (
    <div className="space-y-4">
         <div className="flex justify-between items-center mb-4">
            <p className="text-gray-600 font-semibold">{quiz.length} bài kiểm tra</p>
            <button className="flex items-center p-2 bg-[#4BA4E3] text-white rounded-[10px] text-sm cursor-pointer shadow-sm hover:bg-[#227FC2]">
                <Plus className="w-4 h-4 mr-1" /> Tạo bài kiểm tra mới
            </button>
        </div>
        {quiz.map((item, index) => (
            <div key={index} className="p-4 bg-white rounded-[10px] shadow-[0_0_3px_rgba(0,0,0,0.2)]">
                <div className="flex justify-between items-start">
                    <h4 className="text-lg font-semibold text-gray-800">{item.name}</h4>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${item.status == "Đang mở" ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-600'}`}>
                        {item.status}
                    </span>
                </div>
                <p className="text-sm text-gray-500 mt-3">{item.description}</p>

                <div className="flex items-center space-x-[20%] mt-3">
                    <div className="text-sm text-gray-500 space-y-4">
                        <p className="flex items-center"><CalendarIcon className="w-4 h-4 mr-1 text-gray-600" /> {item.date}</p>                        
                        <p className="flex items-center"><Clock className="w-4 h-4 mr-1 text-gray-600" /> {item.total}</p>
                    </div>  
                    <div className="text-sm text-gray-500 space-y-4">
                        <p className="flex items-center"><Clock className="w-4 h-4 mr-1 text-gray-600" /> {item.duration}</p>
                        <p className="flex items-center"><List className="w-4 h-4 mr-1 text-gray-600" /> {item.submitted}</p>
                    </div> 
                </div>
                <div className="border border-b-[1px] rounded-[10px] border-gray-200 mt-3"></div>

                <div className="mt-4 flex justify-between items-center space-x-2"> 
                    <button className="flex flex-1 items-center justify-start px-2 py-1 text-sm text-[#4BA4E3] border border-[#4BA4E3] rounded-[8px] hover:bg-[#EBF7FF] cursor-pointer">
                        <Eye size={14} className="mr-1 relative top-[-1px]"/> Xem kết quả
                    </button> 
                    <button className="flex items-center justify-center px-2 py-1 text-sm bg-white text-[#4BA4E3] border border-[#4BA4E3] rounded-[8px] hover:bg-[#EBF7FF] cursor-pointer">
                        <Edit size={14} className="mr-1 relative top-[-1px]" /> Chỉnh sửa
                    </button>
                        <button className="flex items-center justify-center px-2 py-1 text-sm bg-white text-[#FB2C36] border border-[#FB2C36] rounded-[8px] hover:bg-[#FFE0E1] cursor-pointer">
                        <Trash2 size={14} className="mr-1 relative top-[-1px]" /> Xóa
                    </button>
                </div>
            </div>
        ))}
    </div>
);

// Tab 3: Lịch hẹn (CẬP NHẬT)
const TabClassSchedule: React.FC<{ schedule: any[] }> = ({ schedule }) => (
     <div className="space-y-4">
        <p className="text-gray-600 font-semibold">{schedule.length} lịch hẹn</p>
         {schedule.map((item, index) => (
            <div key={index} className="flex justify-between items-center p-4 bg-white rounded-[10px] shadow-[0_0_3px_rgba(0,0,0,0.2)]">
                <div className="flex items-center space-x-4">
                    <div className="w-15 h-15 bg-[#4BA4E3] rounded-[8px]">
                    </div>
                    <div className="space-y-2">
                        <p className="font-semibold text-gray-800">{item.title}</p>
                        <div className="flex items-center text-gray-500 space-x-8">
                            <div className="flex items-center space-x-2">
                                <CalendarDays size={14} className="relative top-[-2px]"/>
                                <p className="text-sm">{item.date}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Clock size={14} className="relative top-[-1px]"/>
                                <p className="text-sm">{item.time}</p>
                            </div>
                        </div>                        
                    </div>
                </div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${item.status === 'Đã hoàn thành' ? 'bg-gray-100 text-gray-600' : 'bg-yellow-100 text-yellow-700'}`}>
                    {item.status}
                </span>
            </div>
         ))}
    </div>
);

// Tab 4: Danh sách Sinh viên (CẬP NHẬT với Tiến độ)
const TabStudents: React.FC<{ list: any[] }> = ({ list }) => (
    <div className="bg-white">
        <div className="relative mb-3 text-gray-600">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                <Search size={16} />
            </span>
            <input type="text" placeholder="Tìm kiếm theo tên hoặc MSSV..." className="w-1/2 pl-10 p-2 bg-[#F3F3F5] border border-gray-200 rounded-[10px]" />
        </div>
        <table className="min-w-full divide-y divide-gray-200 rounded-[10px] shadow-[0_0_3px_rgba(0,0,0,0.2)]">
            <thead className="bg-gray-50">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">MSSV</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Họ và Tên</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Tiến độ</th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {list.map(student => (
                    <tr key={student.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium">{student.id}</td>
                        <td className="px-6 py-4 text-sm">{student.name}</td>
                        <td className="px-6 py-4 text-sm text-blue-600">{student.email}</td>
                        <td className="px-6 py-4 text-sm">
                            <div className="flex items-center">
                                <span className="w-16 mr-2">{student.progress}%</span>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div 
                                        className={`h-2 rounded-full ${
                                            student.progress > 80 ? 'bg-green-500' : 
                                            student.progress > 50 ? 'bg-blue-500' : 'bg-yellow-500'
                                        }`} 
                                        style={{ width: `${student.progress}%` }}
                                    ></div>
                                </div>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

// --- Trang Chi tiết chính (CẬP NHẬT VỚI STATE QUẢN LÝ MODAL) ---
export default function TutorClassDetailPage() {
    const params = useParams(); 
    const [activeTab, setActiveTab] = useState('lecture'); 
        
    const [isLectureModalOpen, setIsLectureModalOpen] = useState(false);
    const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
    const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
    const [isManageModalOpen, setIsManageModalOpen] = useState(false);
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        if (!params.classId) return;
        fetch(`/api/Tutor/my-classes/${params.classId}`)
        .then((res) => res.json())
        .then((json) => setData(json))
        .catch(() => setData(null));
    }, [params.classId]);

    if (!data) return <p>Đang tải dữ liệu...</p>;

    const renderTabContent = () => {
        switch (activeTab) {
            case 'lecture': 
                return <TabLectures lecture={data.lecture} onOpenLectureModal={() => setIsLectureModalOpen(true)} />;
            case 'quiz': 
                return <TabQuizzes quiz={data.quiz} />;
            case 'schedule': 
                return <TabClassSchedule schedule={data.schedule} />;
            case 'list': 
                return <TabStudents list={data.list} />;
            default: 
                return <TabLectures lecture={data.lecture} onOpenLectureModal={() => setIsLectureModalOpen(true)} />;
        }
    };
    
    const TabButton: React.FC<{ name: string; label: string; }> = ({ name, label }) => (
         <button
            onClick={() => setActiveTab(name)}
            className={`w-full px-6 py-3 font-medium text-[14px] transition cursor-pointer ${activeTab === name ? 'text-[#4BA4E3] border-b-2 border-[#4BA4E3]' : 'text-gray-500 hover:text-gray-700'}`}
        >
            {label}
        </button>
    );
    
    return (
        <>
            {/* 1. Render tất cả các Modal (Chúng tự ẩn/hiện) */}
            <AddLectureModal 
                isOpen={isLectureModalOpen} 
                onClose={() => setIsLectureModalOpen(false)} 
            />
            <AddScheduleModal 
                isOpen={isScheduleModalOpen} 
                onClose={() => setIsScheduleModalOpen(false)} 
            />
            <SendNotificationModal 
                isOpen={isNotificationModalOpen} 
                onClose={() => setIsNotificationModalOpen(false)}
                courseName={`${data.courseName} (${params.classId})`}
            />
            <ManageMaterialsModal 
                isOpen={isManageModalOpen} 
                onClose={() => setIsManageModalOpen(false)}
                onAddNew={() => {
                    setIsManageModalOpen(false);
                    setIsLectureModalOpen(true); 
                }}
            />

            {/* 2. Render nội dung trang */}
            <div className="bg-white py-6 px-12 rounded-[10px] shadow-[0_4px_3px_rgba(0,0,0,0.2)] mt-3">
                <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">                
                    <div className="flex-1">
                        <div className="mb-6">
                            <Link href="/Tutor/my-classes" className="flex items-center text-[#797B7F] hover:text-gray-800 text-sm mb-2">
                                <ArrowLeft className="w-4 h-4 mr-1" /> Trở về Lớp học của tôi
                            </Link>
                            <h2 className="text-3xl font-bold text-gray-900">{data.courseName} ({data.courseCode}#{params.classId})</h2>
                            <p className="text-md text-gray-500">{data.description}</p>
                        </div>

                        <div className="border-b border-gray-200 mb-6">
                            <nav className="flex justify-between" aria-label="Tabs">
                                <TabButton name="lecture" label="Bài giảng & Tài liệu" />
                                <TabButton name="quiz" label="Bài kiểm tra" />
                                <TabButton name="schedule" label="Lịch hẹn" />
                                <TabButton name="list" label="Danh sách Sinh viên" />
                            </nav>
                        </div>

                        {renderTabContent()}
                    </div>
                    
                    <div className="w-full lg:w-80 shrink-0">
                        <CourseInfoSidebar 
                            data={data}
                            onOpenSchedule={() => setIsScheduleModalOpen(true)}
                            onOpenNotification={() => setIsNotificationModalOpen(true)}
                            onOpenManage={() => setIsManageModalOpen(true)}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
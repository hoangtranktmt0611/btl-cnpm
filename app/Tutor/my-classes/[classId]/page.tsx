// app/Tutor/my-classes/[classId]/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
    ArrowLeft, Book, FileText, Download, PlayCircle, Link as LinkIcon, Users, Clock, 
    Plus, Edit, Trash2, Send, Settings, Calendar as CalendarIcon, List, Eye
} from 'lucide-react';
import { useParams } from 'next/navigation';

// Import các modal mới
import AddLectureModal from '@/components/AddLectureModal';
import AddScheduleModal from '@/components/AddScheduleModal';
import SendNotificationModal from '@/components/SendNotificationModal';
import ManageMaterialsModal from '@/components/ManageMaterialsModal';

// --- Dữ liệu Mock ---
const COURSE_INFO = {
    courseName: 'Công nghệ Phần mềm', courseCode: '(CO3001)',
    description: "Let's learn about colors, color contrast and color styles...",
    maLop: '251001', soSinhVien: 6, soBaiGiang: 5,
};
const LECTURE_DATA = [
    { type: 'file', title: 'Chương 1: Giới thiệu về Color Styles', desc: 'Tài liệu giới thiệu cơ bản...', icon: FileText },
    { type: 'video', title: 'Video bài giảng: Design Principles', desc: 'Video hướng dẫn...', icon: PlayCircle },
    { type: 'link', title: 'Tài liệu tham khảo: UI Components', desc: 'Bộ tài liệu...', icon: LinkIcon },
    { type: 'file', title: 'Chương 3: Layout và Spacing', desc: 'Tài liệu...', icon: FileText },
];
const QUIZ_DATA = [
    { name: 'Kiểm tra giữa kỳ - Design Fundamentals', status: 'Đang mở', date: 'Hạn: 15/12/2025 23:59', duration: '60 phút', submitted: '4/6 đã nộp', isAvailable: true },
    { name: 'Bài tập tuần 3 - Layout Design', status: 'Đã kết thúc', date: 'Hạn: 08/12/2025 23:59', duration: '45 phút', submitted: '6/6 đã nộp', isAvailable: false },
];
const SCHEDULE_DATA = [
    { title: 'Giới thiệu và Design System', date: '15/11/2025', time: '14:00 - 16:00', status: 'Đã hoàn thành' },
    { title: 'Typography và Color Theory', date: '22/11/2025', time: '14:00 - 16:00', status: 'Đã hoàn thành' },
    { title: 'Layout và Components', date: '29/11/2025', time: '14:00 - 16:00', status: 'Sắp tới' },
    { title: 'Responsive Design', date: '06/12/2025', time: '14:00 - 16:00', status: 'Sắp tới' },
];
const STUDENT_DATA = [
    { id: '2011234', name: 'Nguyễn Văn An', email: 'an.nguyen@hcmut.edu.vn', progress: 75 },
    { id: '2011235', name: 'Trần Thị Bình', email: 'binh.tran@hcmut.edu.vn', progress: 60 },
    { id: '2011236', name: 'Lê Hoàng Châu', email: 'chau.le@hcmut.edu.vn', progress: 100 },
    { id: '2011237', name: 'Phạm Minh Đức', email: 'duc.pham@hcmut.edu.vn', progress: 45 },
    { id: '2011238', name: 'Võ Thị Hoa', email: 'hoa.vo@hcmut.edu.vn', progress: 80 },
    { id: '2011239', name: 'Đặng Văn Khoa', email: 'khoa.dang@hcmut.edu.vn', progress: 100 },
];

// --- Components Con (Định nghĩa bên trong page) ---

// Sidebar thông tin (CẬP NHẬT với "Hành động nhanh")
const CourseInfoSidebar: React.FC<{
    onOpenSchedule: () => void;
    onOpenNotification: () => void;
    onOpenManage: () => void;
}> = ({ onOpenSchedule, onOpenNotification, onOpenManage }) => (
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
                    <p className="text-xs text-gray-600">Let's learn about colors...</p>
                </div>
            </div>
        </div>
        <h3 className="font-bold text-lg text-blue-600">{COURSE_INFO.courseName} {COURSE_INFO.courseCode}</h3>
        <p>Mã Lớp: <span className="font-semibold">{COURSE_INFO.maLop}</span></p>
        <div className="space-y-2 text-sm text-gray-700">
            <p className="flex items-center"><Users className="w-4 h-4 mr-2 text-gray-400" /> {COURSE_INFO.soSinhVien} Sinh viên</p>
            <p className="flex items-center"><Book className="w-4 h-4 mr-2 text-gray-400" /> {COURSE_INFO.soBaiGiang} Bài giảng</p>
        </div>
         {/* Hành động nhanh (CẬP NHẬT) */}
         <div className="pt-4 border-t">
            <h4 className="font-semibold mb-3">Hành động nhanh</h4>
            <div className="space-y-2">
                <button 
                    onClick={onOpenSchedule}
                    className="w-full flex items-center text-sm p-2 text-blue-600 rounded-md hover:bg-blue-50 border border-blue-200"
                >
                    <CalendarIcon className="w-4 h-4 mr-2" /> Thiết lập lịch hẹn
                </button>
                 <button 
                    onClick={onOpenNotification}
                    className="w-full flex items-center text-sm p-2 text-blue-600 rounded-md hover:bg-blue-50 border border-blue-200"
                 >
                    <Send className="w-4 h-4 mr-2" /> Gửi thông báo cho tất cả sinh viên
                </button>
                 <button 
                    onClick={onOpenManage}
                    className="w-full flex items-center text-sm p-2 text-blue-600 rounded-md hover:bg-blue-50 border border-blue-200"
                 >
                    <Settings className="w-4 h-4 mr-2" /> Quản lý tài liệu
                </button>
            </div>
         </div>
    </div>
);

// Tab 1: Bài giảng & Tài liệu (CẬP NHẬT)
const TabLectures: React.FC<{ onOpenLectureModal: () => void }> = ({ onOpenLectureModal }) => (
    <div className="space-y-4">
        <div className="flex justify-between items-center mb-4">
            <p className="text-gray-600 font-semibold">{LECTURE_DATA.length} tài liệu</p>
            <button 
                onClick={onOpenLectureModal}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md text-sm shadow-sm hover:bg-blue-700"
            >
                <Plus className="w-4 h-4 mr-1" /> Thêm bài giảng/tài liệu mới
            </button>
        </div>
        {LECTURE_DATA.map((item, index) => (
             <div key={index} className="flex justify-between items-center p-4 bg-white rounded-lg border-b hover:bg-gray-50 transition">
                <div className="flex items-center space-x-4">
                    <item.icon className={`w-6 h-6 ${item.type === 'video' ? 'text-red-500' : item.type === 'link' ? 'text-purple-500' : 'text-blue-500'} shrink-0`} />
                    <div>
                        <p className="font-semibold text-gray-800">{item.title}</p>
                        <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                </div>
                <div className="flex space-x-3 text-sm shrink-0">
                    <button className="text-blue-600 hover:underline flex items-center"><Eye className="w-4 h-4 mr-1" /> Xem</button>
                    <span className="text-gray-300">|</span>
                    <button className="text-blue-600 hover:underline flex items-center">
                        <Download className="w-4 h-4 mr-1" /> Tải về
                    </button>
                </div>
            </div>
        ))}
    </div>
);

// Tab 2: Bài kiểm tra (CẬP NHẬT)
const TabQuizzes: React.FC = () => (
    <div className="space-y-4">
         <div className="flex justify-between items-center mb-4">
            <p className="text-gray-600 font-semibold">{QUIZ_DATA.length} bài kiểm tra</p>
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md text-sm shadow-sm hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-1" /> Tạo bài kiểm tra mới
            </button>
        </div>
        {QUIZ_DATA.map((item, index) => (
            <div key={index} className="p-5 bg-white rounded-lg border shadow-sm mb-4">
                <div className="flex justify-between items-start">
                    <h4 className="text-lg font-semibold text-gray-800">{item.name}</h4>
                    <span className={`text-xs font-medium px-3 py-1 rounded-full ${item.isAvailable ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                        {item.status}
                    </span>
                </div>
                <div className="flex space-x-4 text-sm text-gray-600 mt-2">
                    <p className="flex items-center"><List className="w-4 h-4 mr-1 text-gray-400" /> {item.submitted}</p>
                    <p className="flex items-center"><Clock className="w-4 h-4 mr-1 text-gray-400" /> {item.duration}</p>
                </div>
                <p className="text-sm text-red-500 mt-1">{item.date}</p>
                <div className="mt-4 flex justify-between">
                    <button className="px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50">
                        Xem kết quả
                    </button>
                     <div className="flex space-x-2">
                         <button className="flex items-center px-3 py-2 text-sm bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
                            <Edit className="w-4 h-4 mr-1" /> Chỉnh sửa
                        </button>
                         <button className="flex items-center px-3 py-2 text-sm bg-red-100 text-red-600 rounded-md hover:bg-red-200">
                            <Trash2 className="w-4 h-4 mr-1" /> Xóa
                        </button>
                     </div>
                </div>
            </div>
        ))}
    </div>
);

// Tab 3: Lịch hẹn (CẬP NHẬT)
const TabClassSchedule: React.FC = () => (
     <div className="space-y-4">
        <p className="text-gray-600 font-semibold">{SCHEDULE_DATA.length} lịch hẹn</p>
         {SCHEDULE_DATA.map((item, index) => (
            <div key={index} className="flex justify-between items-center p-4 bg-white rounded-lg border-l-4 border-blue-500 shadow-sm">
                <div className="flex items-center space-x-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                        <CalendarIcon className="w-5 h-5 text-blue-600" />
                    </div>
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

// Tab 4: Danh sách Sinh viên (CẬP NHẬT với Tiến độ)
const TabStudents: React.FC = () => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border">
        <div className="p-4">
             <input type="text" placeholder="Tìm kiếm theo tên hoặc MSSV..." className="w-full p-2 border border-gray-300 rounded-md" />
        </div>
        <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">MSSV</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Họ và Tên</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tiến độ</th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {STUDENT_DATA.map(student => (
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
    const [activeTab, setActiveTab] = useState('lectures'); 
    
    // States để quản lý 4 modal
    const [isLectureModalOpen, setIsLectureModalOpen] = useState(false);
    const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
    const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
    const [isManageModalOpen, setIsManageModalOpen] = useState(false);

    const renderTabContent = () => {
        switch (activeTab) {
            case 'lectures': return <TabLectures onOpenLectureModal={() => setIsLectureModalOpen(true)} />;
            case 'quizzes': return <TabQuizzes />;
            case 'schedule': return <TabClassSchedule />;
            case 'students': return <TabStudents />;
            default: return <TabLectures onOpenLectureModal={() => setIsLectureModalOpen(true)} />;
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
                courseName={`${COURSE_INFO.courseName} (${params.classId})`}
            />
            <ManageMaterialsModal 
                isOpen={isManageModalOpen} 
                onClose={() => setIsManageModalOpen(false)}
                onAddNew={() => {
                    setIsManageModalOpen(false); // Đóng modal quản lý
                    setIsLectureModalOpen(true); // Mở modal thêm mới
                }}
            />

            {/* 2. Render nội dung trang */}
            <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
                
                <div className="flex-1">
                    <div className="mb-6">
                        <Link href="/Tutor/my-classes" className="flex items-center text-blue-600 hover:text-blue-800 text-sm mb-2">
                            <ArrowLeft className="w-4 h-4 mr-1" /> Trở về Lớp học của tôi
                        </Link>
                        <h2 className="text-3xl font-bold text-gray-900">{COURSE_INFO.courseName} ({params.classId})</h2>
                        <p className="text-md text-gray-500">{COURSE_INFO.description}</p>
                    </div>

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
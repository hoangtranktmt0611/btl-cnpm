// app/Tutor/register-class/[classId]/page.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';

// Dữ liệu mock
const MOCK_SCHEDULED_SESSIONS = [
    { id: 1, title: 'Giảng dạy các chủ đề về sơ đồ', date: 'Thứ Năm, 30 Tháng 10, 2025', time: '09:00 - 11:00 (120 phút)', type: 'Lên lịch' },
    { id: 2, title: 'Tư vấn về định hướng nghề nghiệp và phương pháp học', date: 'Thứ Năm, 30 Tháng 10, 2025', time: '14:00 - 15:30 (90 phút)', type: 'Trực tiếp' },
];

export default function CreateSchedulePage() {
    const params = useParams();
    const classId = params.classId;

    return (
        <div className="space-y-6">
            <div>
                <Link href="/Tutor/register-class" className="flex items-center text-blue-600 hover:text-blue-800 text-sm mb-2">
                    <ArrowLeft className="w-4 h-4 mr-1" /> Trở về
                </Link>
                <h2 className="text-2xl font-bold text-gray-900">Tạo lịch học cho Công nghệ Phần mềm (CO3001#{classId})</h2>
                <p className="text-sm text-gray-500">Tạo lịch học mới hoặc mở buổi tư vấn cho lớp này</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cột Form (2/3) */}
                <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold mb-4">Tạo lịch học / Mở buổi tư vấn</h3>
                    <p className="text-sm text-gray-500 mb-6">Nhập thông tin để tạo lịch học mới hoặc buổi tư vấn cho sinh viên</p>
                    
                    <form className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Ngày học <span className="text-red-500">*</span></label>
                                <input type="date" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Giờ bắt đầu <span className="text-red-500">*</span></label>
                                <input type="time" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                            </div>
                        </div>
                         <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Hình thức học <span className="text-red-500">*</span></label>
                                <select className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
                                    <option>Chọn hình thức</option>
                                    <option>Online</option>
                                    <option>Offline</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Thời lượng (phút) <span className="text-red-500">*</span></label>
                                <select className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
                                    <option>Chọn thời lượng</option>
                                    <option>60 phút</option>
                                    <option>90 phút</option>
                                    <option>120 phút</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Tiêu đề <span className="text-red-500">*</span></label>
                            <input type="text" placeholder="VD: Toán cao cấp, Buổi tư vấn học tập..." className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-700">Mô tả</label>
                            <textarea placeholder="Nhập mô tả chi tiết về buổi học hoặc buổi tư vấn..." className="mt-1 block w-full p-2 border border-gray-300 rounded-md min-h-[100px]"></textarea>
                        </div>
                        <div className="flex justify-end space-x-3 pt-4">
                            <button type="button" className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
                                Hủy
                            </button>
                            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                                Xác nhận
                            </button>
                        </div>
                    </form>
                </div>
                
                {/* Cột Lịch sử (1/3) */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold mb-4">Lịch dạy của tôi</h3>
                    <div className="space-y-4">
                        {MOCK_SCHEDULED_SESSIONS.map(session => (
                            <div key={session.id} className="p-3 border rounded-md bg-gray-50">
                                <div className="flex justify-between items-center mb-1">
                                    <h4 className="font-semibold text-sm">{session.title}</h4>
                                    <span className={`text-xs px-2 py-0.5 rounded-full ${session.type === 'Lên lịch' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                                        {session.type}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-500 flex items-center"><Calendar className="w-3 h-3 mr-1.5" /> {session.date}</p>
                                <p className="text-sm text-gray-500 flex items-center"><Clock className="w-3 h-3 mr-1.5" /> {session.time}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
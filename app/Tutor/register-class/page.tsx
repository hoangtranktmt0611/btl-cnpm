// app/Tutor/register-class/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Plus, User, Users, Calendar, Clock } from 'lucide-react';
import CreateClassModal from '@/components/CreateClassModal'; // Import Modal

// Dữ liệu mock
const MOCK_MANAGED_CLASSES = [
    { id: '251001', name: 'Công nghệ Phần mềm (CO3001)', tutor: 'Yatzilín', studentCount: '35/50 sinh viên', term: 'HK1 2025-2026' },
    { id: '251002', name: 'Công nghệ Phần mềm (CO3001)', tutor: 'Yatzilín', studentCount: '38/40 sinh viên', term: 'HK1 2025-2026' },
    { id: '251003', name: 'Công nghệ Phần mềm (CO3001)', tutor: 'Yatzilín', studentCount: '20/30 sinh viên', term: 'HK1 2025-2026' },
];

// Component Thẻ (dạng List)
const ClassListItem: React.FC<typeof MOCK_MANAGED_CLASSES[0]> = ({ id, name, tutor, studentCount, term }) => (
    <div className="bg-white rounded-lg shadow-md p-5 flex items-center justify-between hover:shadow-lg transition">
        <div>
            <h3 className="text-lg font-semibold text-blue-600">{name}</h3>
            <div className="flex space-x-4 text-sm text-gray-500 mt-2">
                <span className="flex items-center"><User className="w-4 h-4 mr-1" /> {tutor}</span>
                <span className="flex items-center"><Users className="w-4 h-4 mr-1" /> {studentCount}</span>
                <span className="flex items-center"><Calendar className="w-4 h-4 mr-1" /> {term}</span>
            </div>
        </div>
        <Link href={`/Tutor/register-class/${id}`}>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium shadow-sm hover:bg-blue-700">
                Tạo lịch học
            </button>
        </Link>
    </div>
);

export default function RegisterClassPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <CreateClassModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Quản lý lớp học</h2>
                        <p className="text-sm text-gray-500">Danh sách lớp học và tạo lịch giảng dạy</p>
                    </div>
                    <button 
                        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium shadow-sm hover:bg-blue-700"
                        onClick={() => setIsModalOpen(true)}
                    >
                        <Plus className="w-4 h-4 mr-1" /> Tạo lớp học mới
                    </button>
                </div>

                <div className="space-y-4">
                    {MOCK_MANAGED_CLASSES.map(cls => (
                        <ClassListItem key={cls.id} {...cls} />
                    ))}
                </div>
            </div>
        </>
    );
}
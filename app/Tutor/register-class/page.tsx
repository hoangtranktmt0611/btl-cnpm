// app/Tutor/register-class/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Users, Calendar, CircleUser,ChevronLeft, ChevronRight } from 'lucide-react';
import CreateClassModal from '@/components/CreateClassModal'; // Import Modal

export default function RegisterClassPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState<any>(null);
    const cardsPerRow = 3;

    const [selectedRows, setSelectedRows] = useState(1); 
    const [currentPage, setCurrentPage] = useState(1);
    
    useEffect(() => {
    const userId = localStorage.getItem("userId"); // lấy userId đã login
        if (!userId) return; // chưa login thì không fetch

            fetch("http://localhost:8080/api/tutor/get_classes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: Number(userId) }),
        })
        .then((res) => res.json())
        .then((classes: any[]) => {
        setData(classes);
        const maxRows = Math.ceil(classes.length / cardsPerRow);
        setSelectedRows(maxRows);
        });
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedRows]);

    if (!data) {
        return <p>Đang tải dữ liệu...</p>;
    }

    const totalCards = data.length;
    const maxRows = Math.ceil(data.length / cardsPerRow);

    const cardsPerPage = selectedRows * cardsPerRow;
    const totalPages = Math.ceil(totalCards / cardsPerPage);

    const startIndex = (currentPage - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;
    const visibleCards = data.slice(startIndex, endIndex);

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    return (
        <>
            <CreateClassModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            
            <div className="space-y-6 bg-white py-6 px-12 rounded-[10px] shadow-[0_4px_3px_rgba(0,0,0,0.2)] mt-3">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Quản lý lớp học</h2>
                        <p className="text-sm text-gray-500">Danh sách lớp học và tạo lịch giảng dạy</p>
                    </div>
                    <button 
                        className="flex items-center px-4 py-2 bg-[#4BA4E3] text-white rounded-md text-sm font-medium shadow-sm hover:hover:bg-[#227FC2] cursor-pointer"
                        onClick={() => setIsModalOpen(true)}
                    >
                        <Plus className="w-4 h-4 mr-1" /> Tạo lớp học mới
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {visibleCards.map((s: any) => (
                        <div
                            key={s.classId}
                            className="bg-white rounded-lg shadow-[0px_0px_3px_rgba(0,0,0,0.4)] overflow-hidden"
                        >
                            <div className="bg-white rounded-[10px] shadow-[0_0_3px_rgba(0,0,0,0.2)] p-5">
                                <div className="">
                                    <h3 className="text-lg font-semibold text-gray-600">{s.courseName} ({s.courseCode})</h3>
                                    <div className="w-fit mt-2 py-1 px-2 text-xs font-medium text-gray-700 rounded-[10px] border border-gray-300">#{s.classId}</div>
                                    <div className="space-y-3 text-sm text-gray-500 mt-4">
                                        <span className="flex items-center"><CircleUser className="w-4 h-4 mr-3" />Yatzilín</span>
                                        <span className="flex items-center"><Users className="w-4 h-4 mr-3" /> {s.totalStudent}/{s.maxStudent} Sinh viên</span>
                                        <span className="flex items-center"><Calendar className="w-4 h-4 mr-3" /> {s.term} </span>
                                    </div>
                                </div>
                                <div className="w-full flex items-center justify-center mt-3 px-4 py-2 space-x-2 bg-[#4BA4E3] rounded-md shadow-sm hover:bg-[#227FC2] cursor-pointer">
                                    <Calendar className="text-white" size={18}/>
                                    <Link href={`/Tutor/register-class/${s.classId}`}>
                                        <div className="font-medium text-sm text-white">
                                            Tạo lịch học
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                    
                </div>
                {/* Footer */}
                <div className="flex justify-between items-center pt-4 border-t">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <span>Hiển thị</span>
                        <select
                            value={selectedRows}
                            onChange={(e) => setSelectedRows(Number(e.target.value))}
                            className="p-1 border rounded-md cursor-pointer"
                        >
                            {Array.from({ length: maxRows }, (_, i) => i + 1).map((num) => (
                                <option key={num} value={num}>
                                    {num}
                                </option>
                            ))}
                        </select>
                        <span>hàng</span>
                    </div>

                    <div className="flex items-center space-x-2">
                        <button
                            onClick={handlePrevPage}
                            className={`p-2 border rounded-md ${currentPage === 1 ? "text-gray-300" : "text-gray-600 hover:bg-gray-200"}`}
                            disabled={currentPage === 1}
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>

                        <span className="px-3 py-1 bg-[#4BA4E3] text-white rounded-md text-sm">
                            {currentPage}
                        </span>

                        <button
                            onClick={handleNextPage}
                            className={`p-2 border rounded-md ${currentPage === totalPages ? "text-gray-300" : "text-gray-600 hover:bg-gray-200"}`}
                            disabled={currentPage === totalPages}
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>            
        </>
    );
}
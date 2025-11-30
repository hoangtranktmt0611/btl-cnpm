'use client';

import React, { useEffect, useState } from "react";
import Link from 'next/link';
import { Search, ChevronLeft, ChevronRight, FileText, Users, PenLine } from 'lucide-react';

export default function MyClassesPage() {
    const [data, setData] = useState<any>(null);
    const cardsPerRow = 3;

    const [selectedRows, setSelectedRows] = useState(1); 
    const [currentPage, setCurrentPage] = useState(1);
    
    useEffect(() => {
        fetch("/api/Tutor/my-classes")
            .then((res) => res.json())
            .then((json) => {
                setData(json);

                if (json && json.totalCard > 0) {
                    const maxRows = Math.ceil(json.totalCard / cardsPerRow);
                    setSelectedRows(maxRows);
                }
            }); 
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedRows]);

    if (!data) {
        return <p>Đang tải dữ liệu...</p>;
    }

    const totalCards = data.card.length;
    const maxRows = Math.ceil(data.totalCard / cardsPerRow); // Tổng số hàng thực tế
    
    const cardsPerPage = selectedRows * cardsPerRow;
    const totalPages = Math.ceil(totalCards / cardsPerPage);

    const startIndex = (currentPage - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;
    const visibleCards = data.card.slice(startIndex, endIndex);

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    return (
        <div className="space-y-6 bg-white py-6 px-12 rounded-[10px] shadow-[0_4px_3px_rgba(0,0,0,0.2)] mt-3">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h2 className="text-[25px] font-bold text-[#2D3135]">Tổng quan về các lớp học</h2>
                <div className="flex items-center border border-gray-300 rounded-md bg-white p-2 w-72 shadow-sm">
                    <Search className="w-5 h-5 text-gray-500 mr-2" />
                    <input
                        type="text"
                        placeholder="Filter by dates | names"
                        className="w-full text-sm focus:outline-none"
                    />
                </div>
            </div>

            {/* Cards grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {visibleCards.map((s: any) => (
                    <div
                        key={s.classId}
                        className="bg-white rounded-lg shadow-[0px_0px_3px_rgba(0,0,0,0.4)] overflow-hidden cursor-pointer"
                    >
                        <div className="h-25 w-full bg-[#4BA4E3]" />
                        <div className="p-4 mt-[-3px]">
                            <h3 className="text-lg font-semibold text-[#211C37]">
                                {s.courseName} ({s.courseCode})                                
                            </h3>
                            <div className="flex items-center gap-6 mt-1">
                                <div className="flex items-center gap-2">
                                    <FileText className="text-gray-400" size={15} />
                                    <span className="text-sm text-gray-500">{s.totalLecture} Bài giảng</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Users className="text-gray-400" size={15} />
                                    <span className="text-sm text-gray-500">{s.totalStudent} Sinh viên</span>
                                </div>
                            </div>

                            <div className="w-[30%] flex items-center justify-between bg-[#4BA4E3] px-3 py-2 rounded-[7px] mt-3 hover:bg-[#2B82BF]">
                                <PenLine className="text-white" size={12} />
                                <Link href={`/Tutor/my-classes/${s.classId}`} className="text-white text-xs">
                                    Xem chi tiết
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
    );
}

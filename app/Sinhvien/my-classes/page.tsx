// app/Sinhvien/my-classes/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Search, ChevronLeft, ChevronRight, PenLine, Download } from 'lucide-react';

interface ClassCardProps {
    courseName: string;
    courseCode: string;
    classId: string;
}

// Component Thẻ Lớp học
const ClassCard: React.FC<ClassCardProps> = ({ courseName, courseCode, classId }) => (
    <div className="bg-white rounded-lg shadow-[0px_0px_3px_rgba(0,0,0,0.4)] overflow-hidden cursor-pointer">
        <div className="h-25 w-full bg-[#4BA4E3]" />

        <div className="p-4 mt-[-3px]">
            <h3 className="text-lg font-semibold text-[#211C37]">
                {courseName} {courseCode}
            </h3>
            <p className="text-sm text-gray-500 mt-1">MSCB: 2011234</p>

            <div className="flex space-x-3 text-sm">
                <div className="flex items-center justify-between bg-[#4BA4E3] gap-2 px-3 py-2 rounded-[7px] mt-3 hover:bg-[#2B82BF]">
                    <PenLine className="text-white" size={12} />
                    <Link href={`/Sinhvien/my-classes/${classId}`} className="text-white text-xs">
                        Xem chi tiết
                    </Link>
                </div>
                <div className="flex items-center justify-between bg-[#4BA4E3] gap-2 px-3 py-2 rounded-[7px] mt-3 hover:bg-[#2B82BF]">
                    <Download className="text-white" size={12} />
                    <span className="text-white text-xs"> Tải tài liệu </span>
                </div>
            </div>
        </div>
    </div>
);

export default function MyClassesPage() {
    const [classes, setClasses] = useState<ClassCardProps[]>([]);
    
    // --- 1. CÁC STATE PHÂN TRANG (GIỐNG TUTOR) ---
    const cardsPerRow = 3;
    const [selectedRows, setSelectedRows] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    // Lấy data từ API
    useEffect(() => {
        const userId = Number(localStorage.getItem("userId"));
        // Nếu không có userId (test), có thể comment dòng return để chạy mock data bên dưới
        if (!userId) return;

        const fetchClasses = async () => {
            try {
                const res = await fetch(
                    `http://localhost:8080/api/sinhvien/getlistclass?userId=${userId}`,
                    { method: "GET" }
                );

                if (!res.ok) throw new Error("Server error");

                const data: ClassCardProps[] = await res.json();
                setClasses(data);
                
                // Mặc định hiển thị tất cả hàng nếu có ít dữ liệu
                if (data.length > 0) {
                     const calculatedRows = Math.ceil(data.length / cardsPerRow);
                     // Set mặc định là 1 hàng hoặc max hàng tùy ý cậu, ở đây tớ set max giống tutor
                     setSelectedRows(calculatedRows > 0 ? calculatedRows : 1);
                }

            } catch (err) {
                console.error("Fetch classes failed:", err);
            }
        };

        fetchClasses();
    }, []);

    // Reset về trang 1 khi đổi số lượng hàng hiển thị
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedRows]);

    // --- 2. LOGIC TÍNH TOÁN PHÂN TRANG ---
    const totalCards = classes.length;
    const maxTotalRows = Math.ceil(totalCards / cardsPerRow); // Tổng số hàng tối đa có thể có

    const cardsPerPage = selectedRows * cardsPerRow;
    const totalPages = Math.ceil(totalCards / cardsPerPage);

    const startIndex = (currentPage - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;
    
    // Cắt dữ liệu để hiển thị
    const visibleCards = classes.slice(startIndex, endIndex);

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    return (
        <div className="space-y-6 bg-white py-6 px-12 rounded-[10px] shadow-[0_4px_3px_rgba(0,0,0,0.2)] mt-3">
            {/* Thanh tìm kiếm */}
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

            {/* Lưới lớp học (Hiển thị visibleCards thay vì classes gốc) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {visibleCards.length > 0 ? (
                    visibleCards.map((classItem, index) => (
                        <ClassCard key={index} {...classItem} />
                    ))
                ) : (
                    <p className="text-gray-500 col-span-3 text-center py-10">Chưa có lớp học nào.</p>
                )}
            </div>

            {/* --- 3. FOOTER PHÂN TRANG --- */}
            <div className="flex justify-between items-center pt-4 border-t">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <span>Hiển thị</span>
                    <select
                        value={selectedRows}
                        onChange={(e) => setSelectedRows(Number(e.target.value))}
                        className="p-1 border rounded-md cursor-pointer"
                    >
                        {/* Tạo option dynamic dựa trên tổng số lượng bài */}
                        {Array.from({ length: maxTotalRows || 1 }, (_, i) => i + 1).map((num) => (
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
                        className={`p-2 border rounded-md ${currentPage === totalPages || totalPages === 0 ? "text-gray-300" : "text-gray-600 hover:bg-gray-200"}`}
                        disabled={currentPage === totalPages || totalPages === 0}
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
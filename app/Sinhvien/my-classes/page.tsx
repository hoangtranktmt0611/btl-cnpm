// app/Sinhvien/my-classes/page.tsx
'use client';

import React, { useEffect, useState } from 'react';   // ❗ Bạn quên import
import Link from 'next/link';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';

interface ClassCardProps {
    courseName: string;
    courseCode: string;
    classId: string;
}

// Component Thẻ Lớp học
const ClassCard: React.FC<ClassCardProps> = ({ courseName, courseCode, classId }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300">
        <div className="p-4 border-b">
            <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-amber-50 p-2 rounded-lg border flex flex-wrap content-start shrink-0">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="w-1/4 h-1/4 bg-amber-600"></div>
                    ))}
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="w-1/4 h-1/4 bg-gray-600"></div>
                    ))}
                </div>
                <div>
                    <p className="font-bold text-gray-800 text-sm">Color Styles</p>
                    <p className="text-xs text-gray-600">
                        Let's learn about colors, color contrast...
                    </p>
                </div>
            </div>
        </div>

        <div className="p-4">
            <h3 className="text-lg font-semibold text-blue-600">
                {courseName} {courseCode}
            </h3>
            <p className="text-sm text-gray-500 mt-1">MSCB: 2011234</p>

            <div className="mt-4 flex space-x-3 text-sm">
                <Link href={`/Sinhvien/my-classes/${classId}`} className="text-blue-600 hover:underline">
                    Xem chi tiết
                </Link>
                <span className="text-gray-400">|</span>
                <button className="text-gray-600 hover:underline">Tài liệu</button>
            </div>
        </div>
    </div>
);

export default function MyClassesPage() {
    const [classes, setClasses] = useState<ClassCardProps[]>([]);

    // Lấy data từ API
    useEffect(() => {
        const userId = Number(localStorage.getItem("userId"));
        if (!userId) return;

        const fetchClasses = async () => {
            try {
                const res = await fetch(
                    `http://localhost:8080/api/sinhvien/getlistclass?userId=${userId}`,
                    {
                        method: "GET",
                    }
                );


                if (!res.ok) throw new Error("Server error");

                const data: ClassCardProps[] = await res.json();
                setClasses(data);
            } catch (err) {
                console.error("Fetch classes failed:", err);
            }
        };

        fetchClasses();
    }, []);

    const itemsPerPage = 3;
    const totalPages = Math.ceil(classes.length / (itemsPerPage * 3));
    const currentPage = 1;

    return (
        <div className="space-y-6">
            {/* Thanh tìm kiếm */}
            <div className="flex justify-end items-center">
                <div className="flex items-center border border-gray-300 rounded-md bg-white p-2 w-72 shadow-sm">
                    <Search className="w-5 h-5 text-gray-500 mr-2" />
                    <input
                        type="text"
                        placeholder="Filter by dates | names"
                        className="w-full text-sm focus:outline-none"
                    />
                </div>
            </div>

            {/* Lưới lớp học */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {classes.map((classItem, index) => (
                    <ClassCard key={index} {...classItem} />
                ))}
            </div>

            {/* Phân trang */}
            <div className="flex justify-between items-center pt-4 border-t">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <span>Hiển thị</span>
                    <select className="p-1 border rounded-md">
                        <option>3</option>
                        <option>6</option>
                        <option>9</option>
                    </select>
                    <span>hàng</span>
                </div>

                <div className="flex items-center space-x-2">
                    <button className="p-2 border rounded-md text-gray-500 hover:bg-gray-200" disabled>
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <span className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm">1</span>
                    <button className="p-2 border rounded-md text-gray-500 hover:bg-gray-200" disabled>
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}

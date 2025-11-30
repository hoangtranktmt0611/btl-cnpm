// app/Tutor/register-class/[classId]/page.tsx
'use client';

import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import { useParams} from "next/navigation";
import { ArrowLeft, Calendar, Clock, Timer, Monitor, FileText} from 'lucide-react';

export default function CreateSchedulePage() {
    const params = useParams();
    const [data, setData] = useState<any>(null);

    useEffect(() => {
    if (!params.classId) return;
    fetch(`/api/Tutor/my-classes/${params.classId}`)
        .then((res) => res.json())
        .then((json) => setData(json))
        .catch(() => setData(null));
    }, [params.classId]);
    
    if (!data) return <p>Đang tải dữ liệu...</p>;

    return (
        <div className="bg-white py-6 px-12 rounded-[10px] shadow-[0_4px_3px_rgba(0,0,0,0.2)] mt-3">
            <div>
                <Link href="/Tutor/register-class" className="flex items-center text-[#797B7F] hover:text-gray-800 text-sm mb-2">
                    <ArrowLeft className="w-4 h-4 mr-1" /> Trở về
                </Link>
                <h2 className="text-2xl font-bold text-gray-900">Tạo lịch học cho {data?.courseName} ({data?.courseCode}#{params.classId})</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-3">
                {/* Cột Form (2/3) */}
                <div className="lg:col-span-1 bg-white px-6 py-4 rounded-[10px] shadow-[0_0_3px_rgba(0,0,0,0.2)]">
                    <h3 className="text-lg font-semibold">Tạo lịch học / Mở buổi tư vấn</h3>
                    <p className="text-sm text-gray-500 mt-1">Nhập thông tin để tạo lịch học mới hoặc buổi tư vấn cho sinh viên</p>
                    
                    <form className="space-y-4 mt-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <div className="flex items-center space-x-2">
                                    <Calendar className="text-gray-700" size={16}/>
                                    <label className="block text-sm font-semibold text-gray-700">Ngày học <span className="text-red-500">*</span></label>
                                </div>
                                <input type="date" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                            </div>
                            <div>
                                <div className="flex items-center space-x-2">
                                    <Clock className="text-gray-700" size={16}/>
                                    <label className="block text-sm font-semibold text-gray-700">Giờ bắt đầu <span className="text-red-500">*</span></label>
                                </div>
                                <input type="time" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                            </div>
                        </div>
                         <div className="grid grid-cols-2 gap-4">
                            <div>
                                <div className="flex items-center space-x-2">
                                    <Monitor className="text-gray-700" size={16}/>
                                    <label className="block text-sm font-semibold text-gray-700">Hình thức học <span className="text-red-500">*</span></label>
                                </div>
                                <select className="mt-1 block w-full p-2 border border-gray-300 rounded-md cursor-pointer">
                                    <option>Online</option>
                                    <option>Offline</option>
                                </select>
                            </div>
                            <div>
                                <div className="flex items-center space-x-2">
                                    <Timer className="text-gray-700" size={16}/>
                                    <label className="block text-sm font-semibold text-gray-700">Thời lượng <span className="text-red-500">*</span></label>
                                </div>
                                <select className="mt-1 block w-full p-2 border border-gray-300 rounded-md cursor-pointer">
                                    <option>60 phút</option>
                                    <option>90 phút</option>
                                    <option>120 phút</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center space-x-2">
                                <FileText className="text-gray-700" size={16}/>
                                <label className="block text-sm font-semibold text-gray-700">Ngày học <span className="text-red-500">*</span></label>
                            </div>
                            <input type="text" placeholder="VD: Toán cao cấp, Buổi tư vấn học tập..." className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                        </div>
                         <div>
                            <label className="block text-sm font-semibold text-gray-700">Mô tả</label>
                            <textarea placeholder="Nhập mô tả chi tiết về buổi học hoặc buổi tư vấn..." className="mt-1 block w-full p-2 border border-gray-300 rounded-md min-h-[100px]"></textarea>
                        </div>
                        <div className="flex space-x-5 mt-2 text-sm">                        
                            <button type="submit" className="flex-1 px-4 py-2 bg-[#4BA4E3] text-white rounded-[10px] hover:bg-[#227FC2] cursor-pointer">
                                Xác nhận
                            </button>                            
                            <button type="button" className="px-4 py-1 bg-white border border-gray-300 text-gray-800 rounded-[10px] hover:bg-gray-200 cursor-pointer">
                                Hủy
                            </button>                            
                        </div>
                    </form>
                </div>
                
                {/* Cột Lịch sử (1/3) */}
                <div className="bg-white px-6 py-4 rounded-[10px] shadow-[0_0_3px_rgba(0,0,0,0.2)]">
                    <h3 className="text-lg font-semibold mb-4">Lịch dạy của tôi</h3>
                    <div className="space-y-4 mt-6">
                        {data?.schedule?.map((session:any) => (
                            <div key={session.classId} className="p-3 border border-gray-300 rounded-[10px] bg-white space-y-2">
                                <div className="flex justify-between items-center mb-1">
                                    <h4 className='text-gray-700 font-bold'>{data?.courseName} ({data?.courseCode}#{params.classId})</h4>                                    
                                    <span className={`text-xs px-3 py-1 rounded-[10px] font-semibold ${session.type === 'Online' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                                        {session.type}
                                    </span>
                                </div>
                                <div className='flex space-x-6'>
                                    <p className="text-sm text-gray-500 flex items-center"><Calendar className="w-4 h-4 mr-1.5" /> {session.date}</p>
                                    <p className="text-sm text-gray-500 flex items-center"><Clock className="w-4 h-4 mr-1.5" /> {session.time} ({session.duration} phút)</p>
                                </div>
                                <div className='flex items-center'>
                                    <FileText className="w-4 h-4 mr-1.5 text-gray-500" /> 
                                    <p className="font-medium text-sm text-gray-500">{session.title}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
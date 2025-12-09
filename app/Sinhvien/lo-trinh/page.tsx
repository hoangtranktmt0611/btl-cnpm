
//app/Sinhvien/lo-trinh/page.tsx
'use client';

import React, { useState } from 'react';
import { AlertTriangle, Map, CheckCircle, ArrowRight } from 'lucide-react';

export default function LearningPathPage() {
    // Trạng thái: 'empty' | 'form' | 'loading' | 'result'
    const [step, setStep] = useState('empty');

    // 1. Màn hình "Chưa có lộ trình" 
    if (step === 'empty') {
        return (
            <div className="mt-6 ml-6">
                {/* Thông báo vàng */}
                <div className="inline-flex items-center bg-[#FFF9C4] border-l-4 border-[#FBC02D] p-4 pr-12 rounded shadow-sm mb-6">
                    <AlertTriangle className="w-6 h-6 text-[#FBC02D] mr-3" />
                    <span className="font-bold text-gray-800 text-lg">Hiện chưa có lộ trình</span>
                </div>

                <div className="block">
                    <button 
                        onClick={() => setStep('form')}
                        className="px-6 py-2 bg-[#4BA4E3] text-white font-medium rounded-md shadow-sm hover:bg-[#227FC2] transition"
                    >
                        Tạo lộ trình
                    </button>
                </div>
            </div>
        );
    }

    if (step === 'form') {
        return (
            <div className="w-full max-w-3xl mx-auto space-y-5 mt-3">
                <div className="bg-white border-t-[25px] border-[#003DA5] shadow-[0_4px_3px_rgba(0,0,0,0.2)] rounded-xl px-6 py-3 mb-2">
                    <h2 className="text-[35px] font-bold text-[#003DA5]">Khảo sát đầu vào</h2>
                    <p className="text-sm mt-1 text-[#4BA4E3] mb-5">Sinh viên điền khảo sát để hệ thống phân tích</p>
                </div>

                <div className="mt-5 space-y-5">
                    {/* Câu 1 */}
                    <div className="bg-white border-l-[15px] border-[#4BA4E3] shadow-[0_4px_3px_rgba(0,0,0,0.2)] rounded-xl p-4 space-y-2">
                        <h3 className="text-lg font-semibold mb-2">Điểm mạnh của bạn là gì?</h3>
                        <input type="text" className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-[#4BA4E3]" placeholder="Nhập câu trả lời..." />
                    </div>

                    {/* Câu 2 */}
                    <div className="bg-white border-l-[15px] border-[#4BA4E3] shadow-[0_4px_3px_rgba(0,0,0,0.2)] rounded-xl p-4 space-y-2">
                        <h3 className="text-lg font-semibold mb-2">Mục tiêu học tập của bạn?</h3>
                        <input type="text" className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-[#4BA4E3]" placeholder="Nhập câu trả lời..." />
                    </div>

                    {/* Câu 3 */}
                    <div className="bg-white border-l-[15px] border-[#4BA4E3] shadow-[0_4px_3px_rgba(0,0,0,0.2)] rounded-xl p-4 space-y-2">
                        <h3 className="text-lg font-semibold mb-2">Mô tả tính cách của bạn?</h3>
                        <input type="text" className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-[#4BA4E3]" placeholder="Nhập câu trả lời..." />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end space-x-3 pt-4">
                        <button
                            onClick={() => {
                                setStep('loading');
                                setTimeout(() => setStep('result'), 2000);
                            }}
                            className="px-6 py-2 bg-[#4BA4E3] text-white font-medium rounded-md shadow-sm hover:bg-[#227FC2] transition"
                        >
                            Submit
                        </button>
                        <button
                            onClick={() => setStep('empty')}
                            className="px-6 py-2 bg-[#FF3B30] text-white font-medium rounded-md shadow-sm hover:bg-red-700 transition"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // 3. Màn hình Loading
    if (step === 'loading') {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003DA5] mb-4"></div>
                <p className="text-gray-600">Hệ thống đang phân tích dữ liệu...</p>
            </div>
        );
    }

    // 4. Màn hình Kết quả
    return (
        <div className="w-full max-w-4xl mx-auto mt-3 bg-white p-8 rounded-[10px] shadow-[0_4px_3px_rgba(0,0,0,0.2)]">
            <div className="flex items-center justify-between mb-6 border-b pb-4">
                <div>
                    <h2 className="text-2xl font-bold text-[#003DA5]">Lộ trình đề xuất</h2>
                    <p className="text-gray-500 text-sm">Dựa trên kết quả khảo sát của bạn</p>
                </div>
                <button onClick={() => setStep('empty')} className="text-sm text-[#4BA4E3] hover:underline">Làm lại</button>
            </div>

            <div className="space-y-6 relative pl-4 border-l-2 border-gray-200 ml-4">
                {[
                    { title: 'Giai đoạn 1: Nền tảng (Tuần 1-4)', desc: 'Ôn tập kiến thức Toán rời rạc và Nhập môn lập trình.', status: 'active' },
                    { title: 'Giai đoạn 2: Tăng tốc (Tuần 5-10)', desc: 'Luyện tập Cấu trúc dữ liệu và Giải thuật nâng cao.', status: 'pending' },
                    { title: 'Giai đoạn 3: Về đích (Tuần 11-15)', desc: 'Làm bài tập lớn và tham gia Mock Test.', status: 'pending' }
                ].map((item, index) => (
                    <div key={index} className="relative pl-6">
                        <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 border-white shadow ${item.status === 'active' ? 'bg-[#4BA4E3]' : 'bg-gray-300'}`}></div>
                        <h4 className={`font-bold text-lg ${item.status === 'active' ? 'text-[#003DA5]' : 'text-gray-700'}`}>{item.title}</h4>
                        <p className="text-gray-600 mb-2">{item.desc}</p>
                        {item.status === 'active' && (
                            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Đang diễn ra</span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
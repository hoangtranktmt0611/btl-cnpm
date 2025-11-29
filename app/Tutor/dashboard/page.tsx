"use client";
import { useEffect, useState } from "react";
import {Calendar, Users, BookOpen, StarIcon, Video, Clock, User, MapPin} from "lucide-react";

export default function Dashboard() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/Tutor/DashBoard")
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  if (!data) return <p>Đang tải dữ liệu...</p>;

  return (
    <main className="flex-1 pt-4">
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white border-l-[5px] border-[#003DA5] shadow-[0_4px_3px_rgba(0,0,0,0.2)] rounded-xl p-4 space-y-2">          
          <div className="flex justify-between items-center">
            <h3 className="text-gray-500">Tổng số học sinh</h3>
            <Users className="text-[#003DA5]"/>
          </div>
          <p className="text-3xl font-bold text-[#003DA5]">{data.summary.totalStudents}</p>
          <p className="text-sm font-regular text-[#003DA5]">Học sinh</p>
        </div>
        <div className="bg-white border-l-[5px] border-[#2B7FFF] shadow-[0_4px_3px_rgba(0,0,0,0.2)] rounded-xl p-4 space-y-2">          
          <div className="flex justify-between items-center">
            <h3 className="text-gray-500">Buổi học tuần này</h3>
            <Calendar className="text-[#2B7FFF]"/>
          </div>
          <p className="text-3xl font-bold text-[#2B7FFF]">{data.summary.sessionsThisWeek}</p>
          <p className="text-sm font-regular text-[#4BA4E3]">Buổi</p>
        </div>
        <div className="bg-white border-l-[5px] border-[#00C950] shadow-[0_4px_3px_rgba(0,0,0,0.2)] rounded-xl p-4 space-y-2">          
          <div className="flex justify-between items-center">
            <h3 className="text-gray-500">Đánh giá trung bình</h3>
            <StarIcon className="text-[#00C950]"/>
          </div>
          <p className="text-3xl font-bold text-[#00C950]">{data.summary.averageRating}%</p>
          <p className="text-sm font-regular text-[#00C950]">Hài lòng</p>
        </div>
        <div className="bg-white border-l-[5px] border-[#FF6900] shadow-[0_4px_3px_rgba(0,0,0,0.2)] rounded-xl p-4 space-y-2">          
          <div className="flex justify-between items-center">
            <h3 className="text-gray-500">Giờ dạy tháng này</h3>
            <BookOpen className="text-[#FF6900]"/>
          </div>
          <p className="text-3xl font-bold text-[#FF6900]">{data.summary.hoursThisMonth}</p>
          <p className="text-sm font-regular text-[#FF6900]">Giờ</p>
        </div>
      </div>

      <div className="flex-1 mt-4">            
            <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-[0_4px_3px_rgba(0,0,0,0.2)]">
              <div className="mb-6">
                  <h2 className="text-[26px] text-[#003DA5] font-bold flex justify-between items-center">
                      Lịch hôm nay
                      <span className="text-sm font-normal text-white bg-[#003DA5] rounded-[10px] px-4 py-1">{data.today.totalSessions} buổi học</span>
                  </h2>
                  <p className="text-[#717182]">{data.today.date}</p>
              </div>
            <div className="space-y-3">
              {data.today.sessions.map((s: any) => {
                return (
                  <div
                    key={s.id}
                    className={`border-[2px] rounded-[10px] p-4 mb-3 ${
                      s.status === "Đã hoàn thành" ? "bg-[#F9FAFB] border-[#E5E7EB]" : "bg-[#F0F5FF] border-[#DBEAFE]"
                    }`}
                  >
                    <div className="flex mb-3 items-center">
                      <div
                        className={`flex items-center justify-center mr-3 p-2 rounded-[8px] ${
                          s.type === "Online" ? "bg-[#DBEAFE]" : "bg-[#DCFCE7]"
                        }`}
                      >
                        {s.type === "Online" ? (
                          <Video className="text-[#155DFC]" size={30} />
                        ) : (
                          <MapPin className="text-[#00A63E]"size={30} />
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="flex justify-between items-center space-x-2">
                          <div className="flex items-center space-x-2">
                            <Clock className="text-[#717182]" size={20} />
                            <span className="text-[#003DA5] text-[16px]">{s.time}</span>
                          </div>
                          <span
                            className={`text-[14px] font-bold rounded-[7px] px-2 py-1 ${
                              s.status === "Đã hoàn thành" ? "bg-gray-200 text-[#1E2939]" : "bg-[#DBEAFE] text-[#193CB8]"
                            }`}
                          >
                            {s.status}
                          </span>
                        </div>

                        <div className="flex items-center space-x-2 mb-1">
                          <User className="text-[#717182]" size={20} />
                          <span className="text-[#0A0A0A] text-[16px]">{s.studentName}</span>
                        </div>

                        <div className="flex items-center space-x-2">
                          {s.type === "Online" ? (
                            <Video className="text-[#717182]" size={20} />
                          ) : (
                            <MapPin className="text-[#717182]"size={20} />
                          )}
                          <span className="text-[#0A0A0A] text-[16px]">{s.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-[#717182] text-[18px] font-bold">{s.course}</div>
                  </div>
                );
              })}
            </div>     
          </div>           
      </div>
    </main>
  );
}

// app/Sinhvien/schedule/page.tsx
"use client";

import React, { useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import dayjs from "dayjs";
import { ChevronLeft, ChevronRight, Funnel, Plus } from "lucide-react";
import "./Schedule.css";

const MOCK_EVENTS = [
  {
    title: "Meeting",
    start: "2025-11-10T11:30:00",
    end: "2025-11-10T13:00:00",
    backgroundColor: "#FEF9C3",
    textColor: "#A16207",
  },
  {
    title: "Review",
    start: "2025-11-18T10:00:00",
    end: "2025-11-18T11:00:00",
    backgroundColor: "#FCE7F6",
    textColor: "#9D174D",
  },
  {
    title: "Discussion",
    start: "2025-11-15T09:00:00",
    backgroundColor: "#FCE7F6",
    textColor: "#9D174D",
  },
  {
    title: "Design Review",
    start: "2025-11-10T14:00:00",
    backgroundColor: "#F5D5D5",
    textColor: "#991B1B",
  },
  {
    title: "Meeting",
    start: "2025-11-29T07:00:00",
    end: "2025-11-29T11:00:00",
    backgroundColor: "#D1E8D9",
    textColor: "#065F46",
  },
];

export default function SchedulePage() {
  const calendarRef = useRef<FullCalendar | null>(null);
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [view, setView] = useState<"dayGridMonth" | "timeGridWeek" | "timeGridDay">("dayGridMonth");

  // Xử lý nút Prev
  const handlePrev = () => {
    const api = calendarRef.current?.getApi();
    api?.prev();
    setCurrentDate(dayjs(api?.getDate()));
  };

  // Xử lý nút Next
  const handleNext = () => {
    const api = calendarRef.current?.getApi();
    api?.next();
    setCurrentDate(dayjs(api?.getDate()));
  };

  // Xử lý nút Today
  const handleToday = () => {
    const api = calendarRef.current?.getApi();
    api?.today();
    setCurrentDate(dayjs(api?.getDate()));
  };

  // Xử lý chuyển đổi View (Tháng/Tuần/Ngày)
  const handleChangeView = (newView: typeof view) => {
    const api = calendarRef.current?.getApi();
    api?.changeView(newView);
    setView(newView);
  };

  // (Optional) Xử lý khi click vào sự kiện (lấy từ logic cũ nếu cần)
  const handleEventClick = (clickInfo: any) => {
     alert(`Sự kiện: ${clickInfo.event.title}`);
  };

  return (
    <div className="rounded-[10px] shadow-[0_4px_3px_rgba(0,0,0,0.2)] bg-white shadow px-10 py-3 mt-3">
      {/* --- HEADER TÙY CHỈNH (TAB VIEW & ACTIONS) --- */}
      <div className="flex justify-between items-center mb-4 border-b-2 border-gray-100">
        <div className="flex gap-4">
          <button
            onClick={() => handleChangeView("dayGridMonth")}
            className={`px-4 py-2 font-medium ${
              view === "dayGridMonth"
                ? "text-[#4BA4E3] border-b-2 border-[#4BA4E3] cursor-pointer"
                : "text-gray-500 cursor-pointer"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => handleChangeView("timeGridWeek")}
            className={`px-4 py-2 font-medium ${
              view === "timeGridWeek"
                ? "text-[#4BA4E3] border-b-2 border-[#4BA4E3] cursor-pointer"
                : "text-gray-500 cursor-pointer"
            }`}
          >
            Weekly
          </button>
          <button
            onClick={() => handleChangeView("timeGridDay")}
            className={`px-4 py-2 font-medium ${
              view === "timeGridDay"
                ? "text-[#4BA4E3] border-b-2 border-[#4BA4E3] cursor-pointer"
                : "text-gray-500 cursor-pointer"
            }`}
          >
            Daily
          </button>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 cursor-pointer p-2 rounded-[10px] border border-[#4BA4E3] hover:bg-gray-200">
            <Funnel className="text-[#4BA4E3]" size={15} />
            <span className="text-xs text-[#4BA4E3]">Filter </span>
          </div>
          <div className="h-8 border-r-2 border-gray-300"></div>
          <div className="flex items-center gap-1 cursor-pointer p-2 rounded-[10px] bg-[#4BA4E3] hover:bg-[#3B88BF]">
            <Plus className="text-xs text-white" size={15} />
            <span className="text-xs text-white">Add Event </span>
          </div>
        </div>
      </div>

      {/* --- NAVIGATION (THÁNG/NĂM & PREV/NEXT) --- */}
      <div className="flex items-center gap-2 mb-3">
        <h2 className="text-lg font-semibold text-blue-900">
          Tháng {currentDate.month() + 1}, Năm {currentDate.year()}
        </h2>

        <div className="flex items-center gap-2 ml-3">
          <button
            onClick={handlePrev}
            className="px-3 py-1 rounded-md bg-white border hover:bg-gray-100"
          >
            <ChevronLeft className="cursor-pointer" />
          </button>
          <button
            onClick={handleToday}
            className="px-3 py-1 rounded-md bg-[#4BA4E3] text-white hover:bg-[#3B88BF] cursor-pointer"
          >
            Today
          </button>
          <button
            onClick={handleNext}
            className="px-3 py-1 rounded-md bg-white border hover:bg-gray-100"
          >
            <ChevronRight className="cursor-pointer" />
          </button>
        </div>
      </div>

      {/* --- CALENDAR CHÍNH --- */}
      <div className="mb-10">
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView={view}
          headerToolbar={false}
          height="auto"
          
          events={MOCK_EVENTS} 
          eventClassNames="!border-0"
          eventTextColor="#111827"
          eventDisplay="block"
          locale="vi"
          eventClick={handleEventClick}
          
          dayCellDidMount={(info) => {
            const dayNumber = info.el.querySelector(
              ".fc-daygrid-day-number"
            ) as HTMLElement;

            if (dayNumber) {
              dayNumber.classList.add(
                "flex",
                "items-center",
                "justify-center",
                "w-8",
                "h-8",
                "mx-auto",
                "rounded-full",
                "text-[#1E293B]",
                "font-medium"
              );

              if (info.isToday) {
                dayNumber.classList.add("bg-[#4BA4E3]", "text-white");
              }
            }
          }}
        />
      </div>
    </div>
  );
}
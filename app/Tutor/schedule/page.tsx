"use client";

import React, { useEffect, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import dayjs from "dayjs";
import { ChevronLeft, ChevronRight, Funnel, Plus } from "lucide-react";
import "./Schedule.css"

export default function SchedulePage() {
  const calendarRef = useRef<FullCalendar | null>(null);
  const [events, setEvents] = useState<any[]>([]);
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [view, setView] = useState<"dayGridMonth" | "timeGridWeek" | "timeGridDay">("dayGridMonth");

  const handleEventClick = (clickInfo: any) => {
     alert(`Sự kiện: ${clickInfo.event.title}`);
  };
  // Lấy dữ liệu mock từ API giả
  useEffect(() => {
    fetch("/api/Tutor/Schedule")
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        const api = calendarRef.current?.getApi();
        api?.refetchEvents();
      });
  }, []);

  const handlePrev = () => {
    const api = calendarRef.current?.getApi();
    api?.prev();
    setCurrentDate(dayjs(api?.getDate()));
  };

  const handleNext = () => {
    const api = calendarRef.current?.getApi();
    api?.next();
    setCurrentDate(dayjs(api?.getDate()));
  };

  const handleToday = () => {
    const api = calendarRef.current?.getApi();
    api?.today();
    setCurrentDate(dayjs(api?.getDate()));
  };

  const handleChangeView = (newView: typeof view) => {
    const api = calendarRef.current?.getApi();
    api?.changeView(newView);
    setView(newView);
  };

  return (
    <div className="rounded-[10px] shadow-[0_4px_3px_rgba(0,0,0,0.2)] bg-white shadow px-10 py-3 mt-3">
      <div className="flex justify-between items-center mb-4 border-b-2 border-gray-100">
        <div className="flex gap-4">
          <button
            onClick={() => handleChangeView("dayGridMonth")}
            className={`px-4 py-2 font-medium ${
              view === "dayGridMonth" ? "text-[#4BA4E3] border-b-2 border-[#4BA4E3] cursor-pointer" : "text-gray-500 cursor-pointer"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => handleChangeView("timeGridWeek")}
            className={`px-4 py-2 font-medium ${
              view === "timeGridWeek" ? "text-[#4BA4E3] border-b-2 border-[#4BA4E3] cursor-pointer" : "text-gray-500 cursor-pointer"
            }`}
          >
            Weekly
          </button>
          <button
            onClick={() => handleChangeView("timeGridDay")}
            className={`px-4 py-2 font-medium ${
              view === "timeGridDay" ? "text-[#4BA4E3] border-b-2 border-[#4BA4E3] cursor-pointer" : "text-gray-500 cursor-pointer"
            }`}
          >
            Daily
          </button>
        </div>
        <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 cursor-pointer p-2 rounded-[10px] border border-[#4BA4E3] hover:bg-gray-200">
              <Funnel className="text-[#4BA4E3]" size={15}/>
              <span className="text-xs text-[#4BA4E3]">Filter </span>
            </div>
            <div className="h-8 border-r-2 border-gray-300">
            </div>
            <div className="flex items-center gap-1 cursor-pointer p-2 rounded-[10px] bg-[#4BA4E3] hover:bg-[#3B88BF]">
              <Plus className="text-xs text-white" size={15}/>
              <span className="text-xs text-white">Add Event </span>
            </div>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-3">
        <h2 className="text-lg font-semibold text-blue-900">
          Tháng {currentDate.month() + 1}, Năm {currentDate.year()}
        </h2>

        <div className="flex items-center gap-2 ml-3">
          <button
            onClick={handlePrev}
            className="px-3 py-1 rounded-md bg-white border hover:bg-gray-100"
          >
            <ChevronLeft className="cursor-pointer"/>
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
            <ChevronRight className="cursor-pointer"/>
          </button>
        </div>
      </div>

      <div className="mb-10">
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView={view}
          headerToolbar={false}
          height="auto"
          events={events}
          locale="vi"
          eventTextColor="#111827"     
          eventClassNames="!border-0"    
          eventDisplay="block"
          eventClick={handleEventClick}
          dayCellDidMount={(info) => {
            const dayNumber = info.el.querySelector(".fc-daygrid-day-number") as HTMLElement;

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

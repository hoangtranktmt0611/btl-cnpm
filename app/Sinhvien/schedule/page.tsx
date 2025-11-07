// app/Sinhvien/schedule/page.tsx
'use client';

import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Filter, Plus } from 'lucide-react';

// Dữ liệu mock cho Lịch học
const MOCK_EVENTS = [
    { title: 'Meeting (11:30 - 13:00)', date: '2025-11-03', backgroundColor: '#FEF9C3', borderColor: '#FBBF24', textColor: '#A16207' },
    { title: 'Review (10:00 - 11:00)', date: '2025-11-10', backgroundColor: '#FCE7F6', borderColor: '#F472B6', textColor: '#9D174D' },
    { title: 'Discussion (10:00 - 11:00)', date: '2025-11-10', backgroundColor: '#FCE7F6', borderColor: '#F472B6', textColor: '#9D174D' },
    { title: 'Design Review', date: '2025-11-27', extendedProps: { time: '10:00' }, backgroundColor: '#F5D5D5', borderColor: '#EF4444', textColor: '#991B1B' },
    { title: 'Meeting', date: '2025-11-29', extendedProps: { time: '14:00' }, backgroundColor: '#D1E8D9', borderColor: '#10B981', textColor: '#065F46' },
];

export default function SchedulePage() {
    
    const handleEventClick = (clickInfo: any) => {
        alert(`Sự kiện: ${clickInfo.event.title}\nThời gian: ${clickInfo.event.startStr}`);
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
            
            {/* Header Lịch tùy chỉnh (Filter & Add Event) */}
            <div className="flex justify-end items-center border-b pb-4">
                <div className="flex items-center space-x-4">
                    <button className="flex items-center text-sm text-gray-600 border p-2 rounded-md hover:bg-gray-50">
                        <Filter className="w-4 h-4 mr-1" /> Filter
                    </button>
                    <button className="flex items-center text-sm bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700">
                        <Plus className="w-4 h-4 mr-1" /> Add Event
                    </button>
                </div>
            </div>

            {/* Component FullCalendar */}
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView='dayGridMonth'
                headerToolbar={{
                    left: 'title',
                    center: 'dayGridMonth,timeGridWeek,timeGridDay',
                    right: 'today prev,next'
                }}
                locale='vi' // Ngôn ngữ tiếng Việt
                buttonText={{
                    today: 'Hôm nay',
                    month: 'Tháng',
                    week: 'Tuần',
                    day: 'Ngày'
                }}
                initialEvents={MOCK_EVENTS}
                eventClick={handleEventClick}
                editable={true}
                selectable={true}
                contentHeight='auto'
                dayMaxEvents={true} // Hiển thị "more"
            />
        </div>
    );
}
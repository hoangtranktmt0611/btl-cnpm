import { NextResponse } from "next/server";

export async function GET() {
  // Mock data
  const data = {
    summary: {
        totalStudents: 45,
        sessionsThisWeek: 12,
        averageRating: 98,
        hoursThisMonth: 156,  
    },
    today: {
        date: "Thứ năm, 06 tháng 11, 2025",
        totalSessions: 3,  
        sessions: [
            {
                id: 1,
                time: "09:00 - 10:30",
                studentName: "Nguyễn Văn An",
                course: "Cấu trúc dữ liệu và giải thuật",
                location: "abc-defj-hig",
                type: "Online",
                status: "Đã hoàn thành",
            },
            {
                id: 2,
                time: "14:00 - 15:30",
                studentName: "Trần Thị Bảo",
                course: "Lập trình hướng đối tượng",
                location: "H6-608",
                type: "Offline",
                status: "Sắp tới",
            },
            {
                id: 3,
                time: "16:00 - 17:00",
                studentName: "Lê Văn Cường",
                course: "Cơ sở dữ liệu",
                location: "abc-defj-hig",
                type: "Online",
                status: "Sắp tới",
            },
        ],
    },
  };

  return NextResponse.json(data);
}

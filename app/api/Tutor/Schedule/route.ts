import { NextResponse } from "next/server";

export async function GET() {
  const events = [
    {
      id: 1,
      title: "Meeting",
      start: "2025-11-10T11:30:00",
      end: "2025-11-10T13:00:00",
      backgroundColor: "#FEF9C3",
      textColor: "#A16207",
    },
    {
      id: 2,
      title: "Review",
      start: "2025-11-18T10:00:00",
      end: "2025-11-18T11:00:00",
      backgroundColor: "#FCE7F6",
      textColor: "#9D174D",
    },
    {
      id: 3,
      title: "Discussion",
      start: "2025-11-15T09:00:00",
      backgroundColor: "#FCE7F6",
      textColor: "#9D174D",
    },
    {
      id: 4,
      title: "Design Review",
      start: "2025-11-10T14:00:00",
      backgroundColor: "#F5D5D5",
      textColor: "#991B1B",
    },
    {
      id: 5,
      title: "Meeting",
      start: "2025-11-29T07:00:00",
      end: "2025-11-29T11:00:00",
      backgroundColor: "#D1E8D9",
      textColor: "#065F46",
    },
  ];

  return NextResponse.json(events);
}

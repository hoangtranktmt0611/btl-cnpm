import { NextResponse } from "next/server";

export async function GET() {
  const events = [
    {
      id: 1,
      title: "Meeting",
      start: "2025-11-06T11:30:00",
      end: "2025-11-06T13:00:00",
      color: "#9af3ffff",
    },
    {
      id: 2,
      title: "Review",
      start: "2025-11-10T10:00:00",
      end: "2025-11-10T11:00:00",
      color: "#fecaca",
    },
    {
      id: 3,
      title: "Discussion",
      start: "2025-11-15T09:00:00",
      color: "#e9d5ff",
    },
    {
      id: 4,
      title: "Design Review",
      start: "2025-11-10T14:00:00",
      color: "#a8fcbfff",
    },
    {
      id: 5,
      title: "Meeting",
      start: "2025-11-10",
      color: "#ffe79eff",
    },
  ];

  return NextResponse.json(events);
}

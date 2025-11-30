"use client";

import { Bell, UserCircle2, ListIndentIncrease, ChevronLeft } from "lucide-react";
import AccountDropdown from '@/components/AccountDropdown';
import NotificationDropdown from '@/components/NotificationDropdown';
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const titleMap: Record<string, string> = {
    "/Tutor/Dashboard": "Bảng điều khiển",
    "/Tutor/Schedule": "Lịch dạy",
    "/Tutor/my-classes": "Lớp học của tôi", 
    "/Tutor/my-classes/detail": "Chi tiết lớp học", 
    "/Tutor/register-class": "Đăng ký lớp học",
    "/Tutor/register-class/detail": "Đăng ký lớp học",
    "/Tutor/tin-nhan": "Tin nhắn",
    "/Tutor/tin-nhan/detail": "Tin nhắn",
  };
  let pageTitle;

  if (titleMap[pathname]) {
    pageTitle = titleMap[pathname];
  } else if (pathname.startsWith("/Tutor/my-classes/")) {
    pageTitle = titleMap["/Tutor/my-classes/detail"];
  } else if (pathname.startsWith("/Tutor/register-class")) {
    pageTitle = titleMap["/Tutor/register-class/detail"];
  } else if (pathname.startsWith("/Tutor/tin-nhan")) {
    pageTitle = titleMap["/Tutor/tin-nhan/detail"];
  } else {
    pageTitle = "Tutor System";
  }

  return (
    <header className="w-full flex items-center justify-between rounded-[10px] shadow-[0_4px_3px_rgba(0,0,0,0.2)] bg-white p-2">
      <div className="flex items-center gap-4">
        <ListIndentIncrease className="text-gray-600" size={22} />
        <h1  className="text-lg font-semibold text-gray-800">{pageTitle}</h1>
      </div>

      <div className="flex items-center gap-3">
        <NotificationDropdown />
        <AccountDropdown userName="Yatzilín" />
      </div>
    </header>
  );
}

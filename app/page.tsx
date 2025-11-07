"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Home() {
  const router = useRouter();

  const team = [
    { name: "Trần Đình Hoàng", role: "Team Leader" },
    { name: "Lê Gia Bảo", role: "Database Engineer" },
    { name: "Nguyễn Minh Hạnh", role: "Backend Developer" },
    { name: "Bành Phú Hội", role: "UI/UX Designer" },
    { name: "Lữ Hoàng Duy", role: "Frontend Developer" },
    { name: "Nguyễn Văn Hiệp", role: "Tester" },
    { name: "Thế Huy", role: "DevOps Engineer" },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 bg-gradient-to-br from-amber-200 via-orange-100 to-pink-300">
      {/* Logo */}
      <Image
      src="/bklogo_transparent.png"
      alt="BK TP.HCM Logo"
      width={120}
      height={120}
      className="object-contain mb-6 drop-shadow-md"
    />
    <div>
      <h1>
        hello
      </h1>
    </div>

      {/* Tiêu đề */}
      <h1 className="text-3xl font-bold text-gray-800 mb-3 drop-shadow-sm">
        Tutor Support System
      </h1>
      <p className="text-gray-700 mb-8">
        Ho Chi Minh City University of Technology – VNU-HCM
      </p>

      {/* Nút đăng nhập */}
      <button
        onClick={() => router.push("/login")}
        className="px-6 py-3 rounded-xl text-lg font-semibold border border-amber-400 text-amber-700 bg-white/40 backdrop-blur-sm shadow-sm hover:bg-white/60 hover:shadow-md transition-all hover:scale-[1.03]"
      >
        Đăng nhập
      </button>

      {/* Mũi tên kéo xuống */}
      <div className="mt-16 animate-bounce text-amber-600 font-semibold text-sm">
        ↓ Kéo xuống để xem thông tin nhóm ↓
      </div>

      {/* Phần thông tin nhóm */}
      <div className="w-full mt-32 pb-20 bg-gradient-to-t from-amber-50/80 to-transparent flex flex-col items-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-10">
          Nhóm phát triển (Group L01_07)
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 max-w-5xl">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/70 backdrop-blur-md border border-amber-200 shadow-md rounded-2xl p-6 hover:shadow-xl hover:scale-[1.03] transition-all"
            >
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-amber-200 to-orange-300 flex items-center justify-center text-xl font-bold text-gray-800 shadow-inner">
                {member.name[0]}
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {member.name}
              </h3>
              <p className="text-gray-600 text-sm">{member.role}</p>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-16 text-gray-600 text-sm text-center">
          Developed by{" "}
          <span className="font-medium text-gray-800">Group L01_07</span> – Course:
          Software Engineering Project (CO3029)
        </footer>
      </div>
    </div>
  );
}

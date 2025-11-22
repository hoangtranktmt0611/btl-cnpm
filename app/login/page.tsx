"use client";

import Image from "next/image";
import { User, Lock, UserCircle, LogIn } from "lucide-react";
import { useState } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [guestName, setGuestName] = useState("");
  const [isGuestMode, setIsGuestMode] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const res = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) throw new Error("Server error");

    const data = await res.json();
    localStorage.setItem("userId", data.ID);

    if (data.success) {
      alert(`Đăng nhập thành công! Vai trò: ${data.role}`);
      if(data.role == "ADMIN") window.location.href = "/Admin/dashboard";
      if(data.role == "STUDENT") window.location.href = "/Sinhvien/dashboard";
      if(data.role == "TUTOR") window.location.href = "/Tutor/dashboard";
       // chuyển hướng vào trang chính
    } else {
      alert(data.message);
    }
  } catch (err: any) {
    console.error(err);
    alert("Không thể kết nối tới server!");
  }
};



  const handleHCMUTLogin = () => {
    if (!username || !password) {
      alert("Vui lòng nhập tên đăng nhập và mật khẩu trước!");
      return;
    }

    localStorage.setItem("username", username);
    window.location.href = "https://sso.hcmut.edu.vn/cas/login";
  };

  const handleGuestMode = () => {
    setIsGuestMode(true);
  };

  const handleGuestLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName) {
      alert("Vui lòng nhập tên người dùng khách!");
      return;
    }
    alert(`Đăng nhập thành công với tư cách khách: ${guestName}`);
  };

  return (
    
     <div className="min-h-screen flex flex-col">
    {/* ===== Header riêng không dính background ===== */}
    <header className="w-full bg-white/90 backdrop-blur-md shadow-md flex items-center justify-start px-6 py-4 z-50">
      <Image
        src="/bklogo_transparent.png"
        alt="BK TP.HCM Logo"
        width={60}
        height={60}
        className="object-contain mr-4"
      />
      <div className="text-left">
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-900">
          Tutor Support System
        </h1>
        <h2 className="text-sm sm:text-base text-gray-700">
          Ho Chi Minh City University of Technology – VNU-HCM
        </h2>
      </div>
    </header>

    {/* ===== Phần nội dung có background ảnh ===== */}
    <main
      className="flex flex-col items-center justify-center flex-grow bg-cover bg-center bg-no-repeat text-center px-4"
      style={{ backgroundImage: "url('/anh_truongbk.jpg')" }}
    >

      {/* Khung đăng nhập ở giữa */}
      <div className="bg-white border border-amber-200 rounded-2xl shadow-lg w-full max-w-md px-8 py-10 text-left mt-24">
        {!isGuestMode ? (
          <>
            <h3 className="text-2xl font-semibold text-center text-gray-700 mb-6">
              Đăng nhập tài khoản
            </h3>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-gray-600 font-medium mb-2">
                  Tên đăng nhập
                </label>
                <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-amber-300">
                  <User size={18} className="text-gray-500 mr-2" />
                  <input
                    type="text"
                    placeholder="Nhập tên đăng nhập"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-600 font-medium mb-2">
                  Mật khẩu
                </label>
                <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-amber-300">
                  <Lock size={18} className="text-gray-500 mr-2" />
                  <input
                    type="password"
                    placeholder="Nhập mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full outline-none"
                    required
                  />
                </div>
              </div>

              <div className="text-right text-sm">
                <a
                  href="#"
                  className="text-amber-600 hover:text-amber-700 font-medium"
                >
                  Quên mật khẩu?
                </a>
              </div>

              <button
                type="submit"
                onClick={handleLogin}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-semibold transition-all"
              >
                Đăng nhập
              </button>
              <button
                type="button"
                onClick={handleHCMUTLogin}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2.5 rounded-lg font-semibold transition-all"
              >
                Đăng nhập SSO HCMUT
              </button>

            </form>

            <div className="flex items-center my-6">
              <div className="flex-grow h-px bg-gray-300"></div>
              <span className="px-3 text-gray-500 text-sm">hoặc</span>
              <div className="flex-grow h-px bg-gray-300"></div>
            </div>

            <button
              onClick={handleGuestMode}
              className="flex items-center justify-center gap-2 w-full bg-white border border-amber-300 hover:bg-amber-100 text-amber-700 py-2.5 rounded-lg font-semibold shadow-md transition hover:scale-[1.02]"
            >
              <UserCircle size={20} />
              Đăng nhập với tư cách khách
            </button>
          </>
        ) : (
          <>
            <h3 className="text-2xl font-semibold text-center text-gray-700 mb-6">
              Đăng nhập người dùng khách
            </h3>

            <form onSubmit={handleGuestLogin} className="space-y-5">
              <div>
                <label className="block text-gray-600 font-medium mb-2">
                  Tên người dùng khách
                </label>
                <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-amber-300">
                  <User size={18} className="text-gray-500 mr-2" />
                  <input
                    type="text"
                    placeholder="Nhập tên hiển thị"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full outline-none"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-600 text-white py-2.5 rounded-lg font-semibold transition-all"
              >
                <LogIn size={18} className="inline mr-2" />
                Vào hệ thống
              </button>

              <button
                type="button"
                onClick={() => setIsGuestMode(false)}
                className="w-full mt-2 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 rounded-lg font-semibold transition-all"
              >
                Quay lại đăng nhập chính
              </button>
            </form>
          </>
        )}
      </div>

      <footer className="mt-10 text-gray-500 text-sm text-center">
        Developed by{" "}
        <span className="font-medium text-black-700">Group L01_07</span> – Course:
        Software Engineering Project (CO3029)
      </footer>
      </main>
    </div>
  );
}

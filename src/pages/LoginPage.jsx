import React from "react";
import LoginCard from "../components/login/LoginCard"; // ✅ path sudah benar

export default function LoginPage() {
  return (
    <div
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/gedungitk.png')",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
        }}
      >

      {/* Overlay putih transparan (shadow lembut di atas foto) */}
      <div className="absolute inset-0 bg-white/50"></div>
      <div className="absolute inset-0 bg-black/5"></div>

      {/* Konten utama (LoginCard) */}
      <div className="relative z-10 flex items-center justify-center p-4">
        <LoginCard />
      </div>
    </div>
  );
}

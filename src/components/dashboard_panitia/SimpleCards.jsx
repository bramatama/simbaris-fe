import React from "react";
import { PenTool, ExternalLink } from "lucide-react";

export default function SimpleCard({ color, title, data }) {
  return (
    <div className="flex-1 flex items-center justify-between bg-white rounded-xl shadow-sm overflow-hidden mx-1">
      {/* Bagian ikon kiri */}
      <div className={`flex items-center justify-center w-14 h-14 ${color}`}>
        <PenTool className="text-white" size={20} />
      </div>

      {/* Bagian teks */}
      <div className="flex-1 px-4 py-3">
        <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
        <p className="text-xs text-gray-500">{data}</p>
      </div>

      {/* Ikon kanan */}
      <div className="pr-4">
        <ExternalLink size={16} className="text-gray-400" />
      </div>
    </div>
  );
}

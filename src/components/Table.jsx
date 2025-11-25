import React from 'react';
import { ArrowUpDown, MoreVertical } from 'lucide-react';

const Table = ({ columns, data, sortConfig, onSort }) => {
    return (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    {/* --- Header --- */}
                    <thead className="bg-blue-600">
                        <tr>
                            {columns.map((col, index) => (
                                <th
                                    key={index}
                                    className={`px-4 py-3 text-left font-semibold text-white text-sm whitespace-nowrap ${col.className || ''}`}
                                >
                                    {col.sortable ? (
                                        <button
                                            className="flex items-center gap-2 hover:text-gray-200"
                                            onClick={() => onSort && onSort(col.accessor)}
                                        >
                                            {col.header}
                                            <ArrowUpDown size={14} className="opacity-70" />
                                        </button>
                                    ) : (
                                        col.header
                                    )}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    {/* --- Body --- */}
                    <tbody className="bg-white divide-y divide-gray-100">
                        {data.length > 0 ? (
                            data.map((row, rowIndex) => (
                                <tr
                                    key={row.id || rowIndex}
                                    className={`hover:bg-gray-50 transition-colors ${
                                        rowIndex % 2 !== 0 ? 'bg-gray-50/50' : 'bg-white'
                                    }`}
                                >
                                    {columns.map((col, colIndex) => (
                                        <td
                                            key={colIndex}
                                            className={`px-4 py-4 whitespace-nowrap text-sm ${col.cellClassName || 'text-gray-600'}`}
                                        >
                                            {/* Render custom cell jika ada fungsi render, jika tidak tampilkan data langsung */}
                                            {col.render ? col.render(row) : row[col.accessor]}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className="px-4 py-8 text-center text-gray-500 text-sm"
                                >
                                    Tidak ada data yang ditemukan.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Table;
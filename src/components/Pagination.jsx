import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({
    currentPage,
    totalItems,
    itemsPerPage,
    onPageChange,
    onItemsPerPageChange,
    pageSizeOptions = [5, 10, 20, 50],
}) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startItem =
        totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    // Generate page numbers array
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-600">
            <div>
                {startItem}-{endItem} of {totalItems}
            </div>

            <div className="flex items-center gap-4">
                {/* Dropdown Items Per Page */}
                <div className="flex items-center gap-2">
                    <span>Result per page</span>
                    <select
                        className="border border-gray-300 rounded px-2 py-1 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                        value={itemsPerPage}
                        onChange={(e) =>
                            onItemsPerPageChange(Number(e.target.value))
                        }
                    >
                        {pageSizeOptions.map((size) => (
                            <option key={size} value={size}>
                                {size}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center gap-1">
                    <button
                        className="flex items-center px-2 py-1 hover:text-blue-600 disabled:opacity-50 disabled:hover:text-gray-600"
                        onClick={() =>
                            onPageChange(Math.max(1, currentPage - 1))
                        }
                        disabled={currentPage === 1 || totalItems === 0}
                    >
                        <ChevronLeft size={16} /> Back
                    </button>

                    <div className="flex gap-1 mx-2">
                        {pageNumbers.map((page) => (
                            <button
                                key={page}
                                onClick={() => onPageChange(page)}
                                className={`w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium transition-colors ${
                                    currentPage === page
                                        ? 'bg-simbaris-secondary text-white'
                                        : 'text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                {page}
                            </button>
                        ))}
                    </div>

                    <button
                        className="flex items-center px-2 py-1 hover:text-simbaris-secondary disabled:opacity-50 disabled:hover:text-gray-600"
                        onClick={() =>
                            onPageChange(Math.min(totalPages, currentPage + 1))
                        }
                        disabled={
                            currentPage === totalPages || totalItems === 0
                        }
                    >
                        Next <ChevronRight size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Pagination;

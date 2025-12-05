'use client';

import { motion } from 'framer-motion';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-gray-800/50 text-gray-400 rounded-lg text-sm hover:text-white hover:bg-gray-800 transition disabled:opacity-30 disabled:cursor-not-allowed"
      >
        ← Previous
      </button>

      <div className="flex gap-2">
        {pages.map((page) => (
          <motion.button
            key={page}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onPageChange(page)}
            className={`w-10 h-10 rounded-lg text-sm font-semibold transition ${
              currentPage === page
                ? 'bg-linear-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                : 'bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            {page}
          </motion.button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-gray-800/50 text-gray-400 rounded-lg text-sm hover:text-white hover:bg-gray-800 transition disabled:opacity-30 disabled:cursor-not-allowed"
      >
        Next →
      </button>
    </div>
  );
}
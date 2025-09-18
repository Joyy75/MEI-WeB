import { ChevronLeft, ChevronRight } from "lucide-react";

export const Pagination = ({ currentPage, totalPages, setCurrentPage, from, to, total }) => (
  <div className="flex flex-col sm:flex-row justify-between items-center   border-t border-[var(--card)]">
    <p className="sub-card font-serif mt-4 sm:mb-0">
      Showing {from} to {to} of {total} results
    </p>

    <div className="flex items-center justify-center space-x-2 mt-8">
      <button
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className="p-2 rounded-lg card hover:opacity-90  disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {[...Array(totalPages)].map((_, i) => (
        <button key={i + 1} onClick={() => setCurrentPage(i + 1)} className={`w-10 h-10 rounded-lg font-medium transition-colors ${currentPage === i + 1 ? 'card' : 'sub-card'}`}>
          {i + 1}
        </button>
      ))}

      <button
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg card hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  </div>
);


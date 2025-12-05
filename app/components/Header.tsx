export default function Header() {
  return (
    <header className="border-b border-gray-800 bg-black/95 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <div className="relative shrink-0">
              <div className="absolute inset-0 bg-linear-to-r from-purple-600 to-blue-600 rounded-full blur-xl opacity-50"></div>
              <div className="relative bg-linear-to-br from-purple-600 via-blue-600 to-cyan-500 p-2 rounded-full">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 18c-3.86-.78-7-4.41-7-8V8.3l7-3.11 7 3.11V12c0 3.59-3.14 7.22-7 8z"/>
                  <path d="M12 6l-6 2.67V12c0 2.97 2.16 5.74 5 6.51V7.33L12 6z" opacity="0.6"/>
                </svg>
              </div>
            </div>
            <div className="min-w-0">
              <h1 className="text-lg sm:text-2xl font-black bg-linear-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent tracking-tight truncate">
                BOOSTARK
              </h1>
              <p className="text-[10px] sm:text-xs text-gray-400 font-medium tracking-wide hidden sm:block">
                Real-time Memecoin Tracker
              </p>
            </div>
          </div>
          <button className="px-3 sm:px-5 py-2 bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-xs sm:text-sm font-semibold rounded-lg transition shadow-lg whitespace-nowrap shrink-0">
            Connect
          </button>
        </div>
      </div>
    </header>
  );
}
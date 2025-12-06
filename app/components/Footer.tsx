export default function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-black/50 backdrop-blur-md mt-16">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
              BOOSTARK
            </h3>
            <p className="text-sm text-gray-400 max-w-md">
              Real-time memecoin tracking powered by AI. Built for traders who move fast.
            </p>
          </div>

          <div className="glass rounded-xl p-6 text-center">
            <p className="text-sm text-gray-400 mb-3">
              Need a custom tracker for your team?
            </p>
            <a
              href="https://twitter.com/Azdev911"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg font-semibold transition shadow-lg"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
              DM @Azdev911
            </a>
            <p className="text-xs text-gray-500 mt-3">
              Custom dashboards • White-label • API access
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center">
          <p className="text-xs text-gray-500">
            © 2025 Boostark. Built with Next.js, TypeScript & Claude AI.
          </p>
          <p className="text-xs text-gray-600 mt-2">
            Not financial advice. DYOR. Prices update every 60s via CoinGecko API.
          </p>
        </div>
      </div>
    </footer>
  );
}

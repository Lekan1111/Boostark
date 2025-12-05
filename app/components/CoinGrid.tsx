'use client';

import { useState, useEffect } from 'react';
import CoinCard from './CoinCard';
import SearchBar from './SearchBar';
import Toast from './Toast';
import Pagination from './Pagination';
import { Coin } from '@/lib/types';
import { motion } from 'framer-motion';


type FilterType = 'all' | 'gainers' | 'losers';
type SortType = 'market_cap' | 'price' | 'change' | 'volume';

const COINS_PER_PAGE = 12;

export default function CoinGrid() {
  const [allCoins, setAllCoins] = useState<Coin[]>([]);
  const [displayedCoins, setDisplayedCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterType>('all');
  const [sort, setSort] = useState<SortType>('volume');
  const [searchQuery, setSearchQuery] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchCoins();
    const interval = setInterval(() => {
      fetchCoins(true);
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    applyFiltersAndSort();
  }, [allCoins, filter, sort, searchQuery, currentPage]);

  const fetchCoins = async (isRefresh = false) => {
    try {
      setError(null);
      
      const response = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category=meme-token&order=volume_desc&per_page=50&page=1&sparkline=false'
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (Array.isArray(data)) {
        setAllCoins(data);
        setLoading(false);
        
        if (isRefresh) {
          setToastMessage('Updated with latest trending coins');
          setShowToast(true);
        }
      } else {
        throw new Error('Invalid data format');
      }
    } catch (error) {
      console.error('Error fetching coins:', error);
      setError('Failed to load data. Retrying...');
      setTimeout(() => fetchCoins(), 5000);
    }
  };

  const applyFiltersAndSort = () => {
    let result = [...allCoins];

    if (searchQuery) {
      result = result.filter(coin => 
        coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filter === 'gainers') {
      result = result.filter(coin => coin.price_change_percentage_24h > 0);
    } else if (filter === 'losers') {
      result = result.filter(coin => coin.price_change_percentage_24h < 0);
    }

    switch (sort) {
      case 'price':
        result.sort((a, b) => b.current_price - a.current_price);
        break;
      case 'change':
        result.sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
        break;
      case 'volume':
        result.sort((a, b) => b.total_volume - a.total_volume);
        break;
      default:
        result.sort((a, b) => b.market_cap - a.market_cap);
    }

    const startIndex = (currentPage - 1) * COINS_PER_PAGE;
    const endIndex = startIndex + COINS_PER_PAGE;
    setDisplayedCoins(result.slice(startIndex, endIndex));
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalPages = Math.ceil(
    (searchQuery 
      ? allCoins.filter(coin => 
          coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
        ).length
      : allCoins.length
    ) / COINS_PER_PAGE
  );

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="h-8 w-64 bg-gray-800 rounded animate-pulse"></div>
          <div className="h-10 w-48 bg-gray-800 rounded animate-pulse"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
            <div key={i} className="glass rounded-xl p-5 h-80 animate-pulse">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 bg-gray-800 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-800 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-800 rounded w-1/2"></div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="h-8 bg-gray-800 rounded"></div>
                <div className="h-12 bg-gray-800 rounded"></div>
                <div className="h-4 bg-gray-800 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass rounded-xl p-8 text-center">
        <p className="text-yellow-400 mb-4">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">
            🔥 Trending Memecoins
          </h2>
          <p className="text-sm text-gray-400">
            Top {allCoins.length} coins by 24h volume • Page {currentPage} of {totalPages}
          </p>
        </motion.div>
        
        <SearchBar onSearch={handleSearch} />
      </div>

      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex gap-2">
          <button 
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              filter === 'all' 
                ? 'bg-linear-to-r from-purple-600 to-blue-600 text-white shadow-lg' 
                : 'bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            All
          </button>
          <button 
            onClick={() => setFilter('gainers')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              filter === 'gainers' 
                ? 'bg-linear-to-r from-green-600 to-emerald-600 text-white shadow-lg' 
                : 'bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            🚀 Gainers
          </button>
          <button 
            onClick={() => setFilter('losers')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              filter === 'losers' 
                ? 'bg-linear-to-r from-red-600 to-rose-600 text-white shadow-lg' 
                : 'bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            📉 Losers
          </button>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortType)}
            className="px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-purple-500 transition"
          >
            <option value="volume">🔥 Trending (Volume)</option>
            <option value="market_cap">💰 Market Cap</option>
            <option value="change">📈 24h Change</option>
            <option value="price">💵 Price</option>
          </select>

          <button 
            onClick={() => fetchCoins(true)}
            className="px-4 py-2 bg-gray-800/50 text-gray-400 rounded-lg text-sm hover:text-white hover:bg-gray-800 transition flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </button>
        </div>
      </div>

      {displayedCoins.length === 0 ? (
        <div className="glass rounded-xl p-12 text-center">
          <p className="text-gray-400 text-lg">No coins found matching your search</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {displayedCoins.map((coin, index) => (
              <CoinCard key={coin.id} coin={coin} index={index} />
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
      
      <div className="mt-8 text-center glass rounded-lg p-4">
        <p className="text-xs text-gray-400 mb-1">
          Powered by CoinGecko API • Real-time data • Auto-refresh every 60s
        </p>
        <p className="text-xs text-gray-500">
          Showing {displayedCoins.length} of {allCoins.length} trending memecoins
        </p>
      </div>

      <Toast 
        message={toastMessage} 
        show={showToast} 
        onClose={() => setShowToast(false)} 
      />
    </div>
  );
}
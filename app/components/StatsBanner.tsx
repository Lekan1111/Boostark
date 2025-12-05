'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface GlobalData {
  total_market_cap: number;
  total_volume: number;
  market_cap_percentage: { btc: number };
}

export default function StatsBanner() {
  const [stats, setStats] = useState<GlobalData | null>(null);

  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/global')
      .then(res => res.json())
      .then(data => setStats(data.data))
      .catch(console.error);
  }, []);

  if (!stats) return null;

  const items = [
    { label: 'Market Cap', value: `$${(stats.total_market_cap / 1e12).toFixed(2)}T` },
    { label: '24h Volume', value: `$${(stats.total_volume / 1e9).toFixed(0)}B` },
    { label: 'BTC Dominance', value: `${stats.market_cap_percentage.btc.toFixed(1)}%` },
  ];

  return (
    <div className="border-b border-gray-800 bg-black/50 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-around">
          {items.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <p className="text-xs text-gray-400 mb-1">{item.label}</p>
              <p className="text-lg font-bold text-white">{item.value}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
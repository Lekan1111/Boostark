'use client';

import { motion } from 'framer-motion';
import { Coin } from '@/lib/types';
import { useState } from 'react';

interface CoinCardProps {
  coin: Coin;
  index: number;
}

const getBuyLink = (coinId: string, symbol: string) => {
  const links: Record<string, string> = {
    'pepe': 'https://app.uniswap.org/swap?outputCurrency=0x6982508145454Ce325dDbE47a25d4ec3d2311933',
    'shib': 'https://app.uniswap.org/swap?outputCurrency=0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE',
    'doge': 'https://www.binance.com/en/trade/DOGE_USDT',
    'bonk': 'https://jup.ag/swap/USDC-Bonk',
    'floki': 'https://app.uniswap.org/swap?outputCurrency=0xcf0C122c6b73ff809C693DB761e7BaeBe62b6a2E',
  };
  return links[symbol.toLowerCase()] || `https://www.coingecko.com/en/coins/${coinId}`;
};

export default function CoinCard({ coin, index }: CoinCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const isPositive = coin.price_change_percentage_24h > 0;
  const changeAbs = Math.abs(coin.price_change_percentage_24h);
  const isPumping = changeAbs > 10;
  
  const pumpProbability = Math.min(95, Math.max(5, 50 + (coin.price_change_percentage_24h * 2)));

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ scale: 1.03, y: -8 }}
      onClick={() => setIsFlipped(!isFlipped)}
      className="glass rounded-xl p-5 hover:glow transition-all duration-300 cursor-pointer relative h-full"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {isPumping && isPositive && (
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-2 -right-2 bg-linear-to-r from-green-500 to-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg z-10"
        >
          🔥 PUMPING
        </motion.div>
      )}
      
      {!isFlipped ? (
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <img 
                src={coin.image} 
                alt={coin.name}
                className="w-14 h-14 rounded-full ring-2 ring-purple-500/30"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900 animate-pulse"></div>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-white text-lg">{coin.name}</h3>
              <p className="text-sm text-gray-400 uppercase tracking-wider">{coin.symbol}</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-baseline">
              <span className="text-2xl font-bold text-white">
                ${coin.current_price < 0.01 
                  ? coin.current_price.toFixed(6) 
                  : coin.current_price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                }
              </span>
            </div>
            
            <div className={`text-center py-3 rounded-lg font-bold text-xl ${
              isPositive ? 'bg-linear-to-r from-green-500/20 to-emerald-500/20 text-green-400' : 'bg-linear-to-r from-red-500/20 to-rose-500/20 text-red-400'
            }`}>
              {isPositive ? '↑' : '↓'} {changeAbs.toFixed(2)}% <span className="text-sm">(24h)</span>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-700">
              <div>
                <p className="text-xs text-gray-500 mb-1">Market Cap</p>
                <p className="text-sm font-semibold text-gray-300">
                  ${(coin.market_cap / 1e9).toFixed(2)}B
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Volume</p>
                <p className="text-sm font-semibold text-gray-300">
                  ${(coin.total_volume / 1e6).toFixed(0)}M
                </p>
              </div>
            </div>
            
            <a
              href={getBuyLink(coin.id, coin.symbol)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="block w-full py-3 bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg font-semibold text-center transition mt-3 shadow-lg"
            >
              Buy Now →
            </a>
            
            <p className="text-center text-xs text-gray-500 mt-2">Click card for AI insights</p>
          </div>
        </div>
      ) : (
        <div className="h-full flex flex-col justify-between">
          <div>
            <h4 className="text-lg font-bold text-purple-400 mb-4 flex items-center gap-2">
              <span>🤖</span> AI Insights
            </h4>
            
            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-500 mb-2">Pump Probability</p>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-3 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${pumpProbability}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className={`h-full rounded-full ${
                        pumpProbability > 70 ? 'bg-linear-to-r from-green-500 to-emerald-500' :
                        pumpProbability > 40 ? 'bg-linear-to-r from-yellow-500 to-orange-500' :
                        'bg-linear-to-r from-red-500 to-rose-500'
                      }`}
                    />
                  </div>
                  <span className="text-white font-bold text-lg">{pumpProbability.toFixed(0)}%</span>
                </div>
              </div>
              
              <div>
                <p className="text-xs text-gray-500 mb-2">Social Sentiment</p>
                <div className="flex gap-2">
                  {['😍', '🚀', '💎', '🔥'].map((emoji, i) => (
                    <span key={i} className="text-2xl opacity-70">{emoji}</span>
                  ))}
                </div>
              </div>
              
              <div>
                <p className="text-xs text-gray-500 mb-2">Whale Activity</p>
                <p className="text-sm text-gray-300">
                  {changeAbs > 15 ? '🐋 High whale movement detected' : 
                   changeAbs > 8 ? '🐬 Moderate whale activity' : 
                   '🐟 Normal trading volume'}
                </p>
              </div>
            </div>
          </div>
          
          <p className="text-center text-xs text-gray-500 mt-4">Click to flip back</p>
        </div>
      )}
    </motion.div>
  );
}
import type { Metadata } from 'next';
import './globals.css';
import { Analytics } from '@vercel/analytics/react';

export const metadata: Metadata = {
  title: 'Boostark - Cryptocurrency Tracker',
  description: 'Real-time cryptocurrency market data',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
       <Analytics />
      </body>
    </html>
  );
}
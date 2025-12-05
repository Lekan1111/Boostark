export async function analyzePumpProbability(coin: {
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  total_volume: number;
  market_cap: number;
}) {
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY || '',
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 300,
        messages: [
          {
            role: 'user',
            content: `Analyze this memecoin for pump probability in next 24h. Respond ONLY with JSON:

Coin: ${coin.name} (${coin.symbol})
Price: $${coin.current_price}
24h Change: ${coin.price_change_percentage_24h}%
Volume: $${coin.total_volume}
Market Cap: $${coin.market_cap}

Return format:
{
  "probability": 0-100,
  "signal": "bullish" | "neutral" | "bearish",
  "reason": "brief explanation",
  "confidence": "high" | "medium" | "low"
}`
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error('API request failed');
    }

    const data = await response.json();
    const textContent = data.content.find((c: any) => c.type === 'text')?.text || '{}';
    
    const jsonMatch = textContent.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    return null;
  } catch (error) {
    console.error('Claude API error:', error);
    return null;
  }
}
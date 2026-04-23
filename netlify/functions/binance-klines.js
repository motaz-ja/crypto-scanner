const cacheMap = new Map();

exports.handler = async function (event) {
  try {
    const { symbol, interval = "4h", limit = "60" } = event.queryStringParameters || {};

    if (!symbol) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "symbol required" })
      };
    }

    const safeLimit = Math.min(Math.max(Number(limit) || 60, 10), 100);
    const key = `${symbol}_${interval}_${safeLimit}`;
    const now = Date.now();
    const cached = cacheMap.get(key);

    if (cached && (now - cached.time < 30000)) {
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cached.data)
      };
    }

    const url = `https://api.binance.com/api/v3/klines?symbol=${encodeURIComponent(symbol)}&interval=${encodeURIComponent(interval)}&limit=${safeLimit}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Klines fetch failed");

    const data = await res.json();
    const parsed = data.map(k => ({
      openTime: Number(k[0]),
      open: Number(k[1]),
      high: Number(k[2]),
      low: Number(k[3]),
      close: Number(k[4]),
      volume: Number(k[5])
    }));

    cacheMap.set(key, { time: now, data: parsed });

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed)
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "failed klines" })
    };
  }
};
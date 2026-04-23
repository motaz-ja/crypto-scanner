let cache = null;
let lastFetch = 0;

exports.handler = async function () {
  const now = Date.now();

  if (cache && (now - lastFetch < 60000)) {
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cache)
    };
  }

  try {
    const res = await fetch("https://api.binance.com/api/v3/exchangeInfo");
    if (!res.ok) throw new Error("Exchange fetch failed");

    const data = await res.json();

    cache = data;
    lastFetch = now;

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "failed exchange" })
    };
  }
};
module.exports = async (req, res) => {
  try {
    const { symbol, interval = "4h", limit = "60" } = req.query;

    if (!symbol) {
      return res.status(400).json({ error: "symbol required" });
    }

    const url = `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`;
    const r = await fetch(url);
    const data = await r.json();

    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=120");
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json({ error: "klines failed" });
  }
};

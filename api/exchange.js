module.exports = async (req, res) => {
  try {
    const r = await fetch("https://api.binance.com/api/v3/exchangeInfo");
    const data = await r.json();
    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=120");
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json({ error: "exchange failed" });
  }
};

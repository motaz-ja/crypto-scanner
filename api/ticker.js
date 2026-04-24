module.exports = async (req, res) => {
  try {
    const r = await fetch("https://api.binance.com/api/v3/ticker/24hr");
    const data = await r.json();
    res.setHeader("Cache-Control", "s-maxage=15, stale-while-revalidate=30");
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json({ error: "ticker failed" });
  }
};

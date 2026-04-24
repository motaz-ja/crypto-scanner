module.exports = async (req, res) => {
  const flows = [
    {
      id: "gala-1",
      symbol: "GALA",
      amount: 1250000,
      fromLabel: "Binance",
      toLabel: "Unknown Wallet",
      flowType: "bullish",
      network: "Ethereum",
      minutesAgo: 14,
      sector: "Gaming",
      note: "سحب من منصة الى محفظة، دعم تجميع واضح"
    },
    {
      id: "sand-1",
      symbol: "SAND",
      amount: 880000,
      fromLabel: "Unknown Wallet",
      toLabel: "Binance",
      flowType: "bearish",
      network: "Ethereum",
      minutesAgo: 31,
      sector: "Gaming",
      note: "تحويل الى منصة، احتمال ضغط بيع"
    }
  ];

  res.setHeader("Cache-Control", "s-maxage=120, stale-while-revalidate=300");
  return res.status(200).json({ flows });
};

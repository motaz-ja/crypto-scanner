exports.handler = async function () {
  try {
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
        note: "سحب من منصة إلى محفظة، دعم تجميع واضح"
      },
      {
        id: "sand-1",
        symbol: "SAND",
        amount: 880000,
        fromLabel: "Unknown Wallet",
        toLabel: "Binance",
        flowType: "bearish",
        network: "Ethereum",
        minutesAgo: 22,
        sector: "Gaming",
        note: "تحويل من محفظة إلى منصة، احتمال ضغط بيع"
      },
      {
        id: "enj-1",
        symbol: "ENJ",
        amount: 2100000,
        fromLabel: "Binance",
        toLabel: "Unknown Wallet",
        flowType: "bullish",
        network: "Ethereum",
        minutesAgo: 31,
        sector: "Gaming",
        note: "تجميع واضح على العملة"
      },
      {
        id: "portal-1",
        symbol: "PORTAL",
        amount: 1600000,
        fromLabel: "Binance",
        toLabel: "Unknown Wallet",
        flowType: "bullish",
        network: "Ethereum",
        minutesAgo: 39,
        sector: "Gaming",
        note: "سحب مباشر من المنصة"
      },
      {
        id: "wld-1",
        symbol: "WLD",
        amount: 530000,
        fromLabel: "Unknown Wallet",
        toLabel: "OKX",
        flowType: "bearish",
        network: "Ethereum",
        minutesAgo: 47,
        sector: "AI",
        note: "إيداع نحو منصة، نراقب ضغط البيع"
      },
      {
        id: "ctsi-1",
        symbol: "CTSI",
        amount: 970000,
        fromLabel: "Binance",
        toLabel: "Unknown Wallet",
        flowType: "bullish",
        network: "Ethereum",
        minutesAgo: 56,
        sector: "Gaming",
        note: "دخول تخزين خارج المنصة"
      },
      {
        id: "ada-1",
        symbol: "ADA",
        amount: 2400000,
        fromLabel: "Binance",
        toLabel: "Unknown Wallet",
        flowType: "bullish",
        network: "Cardano",
        minutesAgo: 19,
        sector: "Layer 1",
        note: "تجميع على العملة"
      },
      {
        id: "ckb-1",
        symbol: "CKB",
        amount: 1800000,
        fromLabel: "Unknown Wallet",
        toLabel: "Binance",
        flowType: "bearish",
        network: "Nervos",
        minutesAgo: 34,
        sector: "Oracle / Infra",
        note: "تحويل نحو منصة"
      }
    ];

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source: "fallback-demo",
        flows
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Failed to load whale flow data" })
    };
  }
};
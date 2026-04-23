const https = require("https");

let cache = null;
let lastFetch = 0;

function getJSON(url) {
  return new Promise((resolve, reject) => {
    https
      .get(
        url,
        {
          headers: {
            "User-Agent": "Mozilla/5.0 CryptoScannerPro",
            Accept: "application/json",
          },
        },
        (res) => {
          let data = "";

          res.on("data", (chunk) => {
            data += chunk;
          });

          res.on("end", () => {
            try {
              if (res.statusCode < 200 || res.statusCode >= 300) {
                return reject(new Error(`HTTP ${res.statusCode}: ${data}`));
              }
              resolve(JSON.parse(data));
            } catch (err) {
              reject(err);
            }
          });
        }
      )
      .on("error", reject);
  });
}

function getFallbackExchange() {
  return {
    symbols: [
      { symbol: "GALAUSDT", status: "TRADING", quoteAsset: "USDT", isSpotTradingAllowed: true },
      { symbol: "SANDUSDT", status: "TRADING", quoteAsset: "USDT", isSpotTradingAllowed: true },
      { symbol: "PORTALUSDT", status: "TRADING", quoteAsset: "USDT", isSpotTradingAllowed: true },
      { symbol: "ENJUSDT", status: "TRADING", quoteAsset: "USDT", isSpotTradingAllowed: true },
      { symbol: "IMXUSDT", status: "TRADING", quoteAsset: "USDT", isSpotTradingAllowed: true },
      { symbol: "WLDUSDT", status: "TRADING", quoteAsset: "USDT", isSpotTradingAllowed: true },
      { symbol: "JSTUSDT", status: "TRADING", quoteAsset: "USDT", isSpotTradingAllowed: true },
      { symbol: "CTSIUSDT", status: "TRADING", quoteAsset: "USDT", isSpotTradingAllowed: true },
      { symbol: "CKBUSDT", status: "TRADING", quoteAsset: "USDT", isSpotTradingAllowed: true },
      { symbol: "ADAUSDT", status: "TRADING", quoteAsset: "USDT", isSpotTradingAllowed: true },
      { symbol: "AVAXUSDT", status: "TRADING", quoteAsset: "USDT", isSpotTradingAllowed: true },
      { symbol: "FETUSDT", status: "TRADING", quoteAsset: "USDT", isSpotTradingAllowed: true }
    ]
  };
}

exports.handler = async function () {
  const now = Date.now();

  if (cache && now - lastFetch < 60000) {
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cache),
    };
  }

  try {
    const data = await getJSON("https://api.binance.com/api/v3/exchangeInfo");
    cache = data;
    lastFetch = now;

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error("binance-exchange failed:", error.message);

    const fallback = getFallbackExchange();
    cache = fallback;
    lastFetch = now;

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fallback),
    };
  }
};

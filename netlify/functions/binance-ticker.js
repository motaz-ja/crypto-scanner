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

function getFallbackTicker() {
  return [
    {
      symbol: "GALAUSDT",
      lastPrice: "0.01980",
      priceChangePercent: "3.45",
      quoteVolume: "12450000",
      count: 18450,
    },
    {
      symbol: "SANDUSDT",
      lastPrice: "0.2740",
      priceChangePercent: "2.91",
      quoteVolume: "24900000",
      count: 90870,
    },
    {
      symbol: "PORTALUSDT",
      lastPrice: "0.1160",
      priceChangePercent: "4.12",
      quoteVolume: "8650000",
      count: 12150,
    },
    {
      symbol: "ENJUSDT",
      lastPrice: "0.1380",
      priceChangePercent: "5.18",
      quoteVolume: "11300000",
      count: 15420,
    },
    {
      symbol: "IMXUSDT",
      lastPrice: "0.7420",
      priceChangePercent: "1.80",
      quoteVolume: "21500000",
      count: 28760,
    },
    {
      symbol: "WLDUSDT",
      lastPrice: "1.1760",
      priceChangePercent: "2.66",
      quoteVolume: "30100000",
      count: 40110,
    },
    {
      symbol: "JSTUSDT",
      lastPrice: "0.0312",
      priceChangePercent: "6.11",
      quoteVolume: "9600000",
      count: 11880,
    },
    {
      symbol: "CTSIUSDT",
      lastPrice: "0.1420",
      priceChangePercent: "4.73",
      quoteVolume: "7800000",
      count: 10140,
    },
    {
      symbol: "CKBUSDT",
      lastPrice: "0.0124",
      priceChangePercent: "2.14",
      quoteVolume: "14300000",
      count: 19020,
    },
    {
      symbol: "ADAUSDT",
      lastPrice: "0.2502",
      priceChangePercent: "1.91",
      quoteVolume: "24930000",
      count: 90870,
    },
    {
      symbol: "AVAXUSDT",
      lastPrice: "21.41",
      priceChangePercent: "2.25",
      quoteVolume: "41200000",
      count: 56600,
    },
    {
      symbol: "FETUSDT",
      lastPrice: "0.6820",
      priceChangePercent: "3.98",
      quoteVolume: "18700000",
      count: 24200,
    }
  ];
}

exports.handler = async function () {
  const now = Date.now();

  if (cache && now - lastFetch < 15000) {
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cache),
    };
  }

  try {
    const data = await getJSON("https://api.binance.com/api/v3/ticker/24hr");
    cache = data;
    lastFetch = now;

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error("binance-ticker failed:", error.message);

    const fallback = getFallbackTicker();
    cache = fallback;
    lastFetch = now;

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fallback),
    };
  }
};

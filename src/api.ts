const BASE_URL = `https://api.coinpaprika.com/v1`;
const API_URL = `https://ohlcv-api.nomadcoders.workers.dev?coinId=`;
const UPBIT_URL = `https://api.upbit.com/v1`;
const UPBIT_CANDLE_URL = `https://api.upbit.com/v1/candles`;
//https://api.upbit.com/v1/ticker?markets=KRW-BTC

export function upbitCoins() {
  return fetch(`${UPBIT_URL}/market/all`).then((response) => response.json());
}

export function upbitCoinTickers(coinId: string) {
  return fetch(`${UPBIT_URL}/ticker?markets=${coinId}`).then((response) =>
    response.json()
  );
}

export function upbitCandle(coinId: string, minute: number, count: number) {
  return fetch(
    `${UPBIT_CANDLE_URL}/minutes/${minute}?market=${coinId}&count=${count}`
  ).then((response) => response.json());
}

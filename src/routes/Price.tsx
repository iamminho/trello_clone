import { useQuery } from "react-query";
import { upbitCandle } from "../api";
import ApexChart from "react-apexcharts";

interface IHistorical {
  candle_acc_trade_price: number;
  candle_acc_trade_volume: number;
  candle_date_time_kst: string;
  candle_date_time_utc: string;
  high_price: number;
  low_price: number;
  market: string;
  opening_price: number;
  timestamp: number;
  trade_price: number;
  unit: number;
}

interface PriceProps {
  coinId: string;
}

function Price({ coinId }: PriceProps) {
  const minute = 60;
  const count = 15;

  const { isLoading, data } = useQuery<IHistorical[]>(["candle", coinId], () =>
    upbitCandle(coinId, minute, count)
  );

  return (
    <div>
      {isLoading ? (
        "Loading price chart..."
      ) : data?.length !== undefined ? (
        <ApexChart
          type="candlestick"
          series={[
            {
              data: data
                ?.sort(
                  (a, b) =>
                    Number(new Date(a.candle_date_time_kst)) -
                    Number(new Date(b.candle_date_time_kst))
                )
                .map((price) => ({
                  x: price.candle_date_time_utc,
                  y: [
                    price.opening_price,
                    price.high_price,
                    price.low_price,
                    price.trade_price,
                  ],
                })),
            },
          ]}
          options={{
            theme: {
              mode: "dark",
            },
            chart: {
              height: 500,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            grid: {
              show: false,
            },
            plotOptions: {
              candlestick: {
                wick: {
                  useFillColor: true,
                },
              },
            },
            yaxis: {
              show: false,
            },
            xaxis: {
              labels: {
                show: false,
              },
              type: "category",
              categories: data?.map((date) => date.candle_date_time_utc),
              axisBorder: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
            },
            tooltip: {
              y: {
                formatter: (value) => `$ ${value.toFixed(2)}`,
              },
            },
          }}
        />
      ) : (
        <h1>No Data</h1>
      )}
    </div>
  );
}

export default Price;

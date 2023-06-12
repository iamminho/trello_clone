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

interface ChartProps {
  coinId: string;
}

function Chart({ coinId }: ChartProps) {
  const minute = 30;
  const count = 10;

  const { isLoading, data } = useQuery<IHistorical[]>(["candle", coinId], () =>
    upbitCandle(coinId, minute, count)
  );

  return (
    <div>
      {isLoading ? (
        "Loding chart..."
      ) : data?.length !== undefined ? (
        <ApexChart
          type="line"
          series={[
            {
              name: "price",
              data: data?.map((obj) => obj.trade_price),
            },
          ]}
          options={{
            theme: { mode: "dark" },
            chart: {
              height: 500,
              width: 500,
              toolbar: { show: false },
              background: "transparent",
            },
            title: {
              text: "Price chart",
              align: "left",
            },
            stroke: { curve: "smooth", width: 4 },
            grid: { show: false },
            yaxis: { show: false },
            fill: {
              type: "gradient",
              gradient: { gradientToColors: ["blue"], stops: [0, 100] },
            },
            colors: ["red"],
          }}
        />
      ) : (
        <h1>No Data</h1>
      )}
    </div>
  );
}

export default Chart;

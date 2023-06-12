import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
}

function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
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
              name: "high",
              data: data?.map((price) => Number(price.close)) as number[],
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
                tools: {},
              },
              background: "transparent",
            },
            stroke: {
              curve: "smooth",
              width: 4,
            },
            fill: {
              type: "gradient",
              gradient: {
                gradientToColors: ["#F2CD5C", "#F2921D", "#A61F69", "#400E32"],
                stops: [0, 100],
              },
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
            xaxis: {
              labels: {
                show: false,
                datetimeFormatter: {
                  month: "mmm 'yy",
                },
              },
              type: "datetime",
              categories: data?.map((date) => date.time_close),
              axisBorder: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
            },
            yaxis: {
              show: false,
            },
            tooltip: {
              y: {
                formatter: (v) => `$ ${v.toFixed(2)}`,
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

export default Chart;

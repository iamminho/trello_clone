import { Helmet } from "react-helmet";
import {
  Switch,
  Route,
  useLocation,
  useParams,
  Link,
  useRouteMatch,
} from "react-router-dom";
import { styled } from "styled-components";
import Price from "./Price";
import Chart from "./Chart";
import { useQuery } from "react-query";
import { upbitCoinTickers } from "../api";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
  margin-bottom: 30px;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.textColor};
  margin-top: 10px;
`;

const Loader = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 20px;
  padding: 30px 20px;
  margin: 20px 20px;
  text-align: center;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  span {
    color: ${(props) => props.theme.textColor};
    font-size: 9px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }

  p {
    font-size: 13px;
    color: ${(props) => props.theme.textColor};
  }
`;

const Description = styled.p`
  color: ${(props) => props.theme.accentColor};
  margin: 20px 0px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.selectColor : props.theme.accentColor};
  a {
    display: block;
  }
`;

const HomeBtn = styled.button`
  display: block;
  color: ${(props) => props.theme.textColor};
  background-color: transparent;
  border: none;
  margin: 10px 5px;
`;

interface RouteParams {
  coinId: string;
}

interface RouteState {
  name: string;
}

interface IUpbitTickerData {
  market: string;
  trade_date: string;
  trade_time: string;
  trade_date_kst: string;
  trade_time_kst: string;
  trade_timestamp: number;
  opening_price: number;
  high_price: number;
  low_price: number;
  trade_price: number;
  prev_closing_price: number;
  change: string;
  change_price: number;
  change_rate: number;
  signed_change_price: number;
  signed_change_rate: number;
  trade_volume: number;
  acc_trade_price: number;
  acc_trade_price_24h: number;
  acc_trade_volume: number;
  acc_trade_volume_24h: number;
  highest_52_week_price: number;
  highest_52_week_date: string;
  lowest_52_week_price: number;
  lowest_52_week_date: string;
  timestamp: number;
}

const Coin = () => {
  const { coinId } = useParams<RouteParams>();
  const { state } = useLocation<RouteState>();
  const priceMatch = useRouteMatch("/:coinId/price");
  const chartMatch = useRouteMatch("/:coinId/chart");

  const { isLoading, data } = useQuery(["upbitTickers", coinId], () =>
    upbitCoinTickers(coinId)
  );

  const coinData =
    !isLoading && data ? (data[0] as IUpbitTickerData) : undefined;

  const loading = isLoading;
  return (
    <Container>
      <Helmet>
        <title>{state?.name ? state.name : undefined}</title>
      </Helmet>

      <HomeBtn>
        <Link to="/">Home</Link>
      </HomeBtn>
      <Header>
        <Title>{state?.name ? state.name : undefined}</Title>
      </Header>

      {loading ? (
        <Loader>Please wait...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Acc trade price</span>
              <p>{coinData?.acc_trade_price.toFixed(2)}</p>
            </OverviewItem>
            <OverviewItem>
              <span>Acc trade price 24h</span>
              <p>{coinData?.acc_trade_price_24h.toFixed(2)}</p>
            </OverviewItem>
          </Overview>

          <Overview>
            <OverviewItem>
              <span>Acc trade volume</span>
              <p>{coinData?.acc_trade_volume.toFixed(2)}</p>
            </OverviewItem>
            <OverviewItem>
              <span>Acc trade volume 24h</span>
              <p>{coinData?.acc_trade_volume_24h.toFixed(2)}</p>
            </OverviewItem>
          </Overview>

          <Overview>
            <OverviewItem>
              <span>change</span>
              <p>{coinData?.change}</p>
            </OverviewItem>
            <OverviewItem>
              <span>change price</span>
              <p>{coinData?.change_price.toFixed(2)}</p>
            </OverviewItem>
            <OverviewItem>
              <span>change rate</span>
              <p>{coinData?.change_rate.toFixed(2)}</p>
            </OverviewItem>
          </Overview>

          <Overview>
            <OverviewItem>
              <span>High price</span>
              <p>{coinData?.high_price}</p>
            </OverviewItem>
            <OverviewItem>
              <span>Highest 52 week date</span>
              <p>{coinData?.highest_52_week_date}</p>
            </OverviewItem>
            <OverviewItem>
              <span>Highest 52 week price</span>
              <p>{coinData?.highest_52_week_price.toFixed(2)}</p>
            </OverviewItem>
          </Overview>

          <Overview>
            <OverviewItem>
              <span>low price</span>
              <p>{coinData?.low_price}</p>
            </OverviewItem>
            <OverviewItem>
              <span>lowest 52 week date</span>
              <p>{coinData?.lowest_52_week_date}</p>
            </OverviewItem>
            <OverviewItem>
              <span>lowest 52 week price</span>
              <p>{coinData?.lowest_52_week_price.toFixed(2)}</p>
            </OverviewItem>
          </Overview>

          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link
                to={{
                  pathname: `/${coinId}/chart`,
                  state: { name: state.name },
                }}
              >
                Chart
              </Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link
                to={{
                  pathname: `/${coinId}/price`,
                  state: { name: state.name },
                }}
              >
                Price
              </Link>
            </Tab>
          </Tabs>

          <Switch>
            <Route path={`/:coinId/price`}>
              <Price coinId={coinId} />
            </Route>
            <Route path={`/:coinId/chart`}>
              <Chart coinId={coinId} />
            </Route>
          </Switch>
        </>
      )}
    </Container>
  );
};

export default Coin;

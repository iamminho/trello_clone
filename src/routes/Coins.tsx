import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { upbitCoins } from "../api";
import { Helmet } from "react-helmet";

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
  margin-top: 15px;
`;

const CoinsList = styled.ul`
  margin: 15px 10px;
`;

const Coin = styled.li`
  background-color: ${(props) => props.theme.overViewColor};
  color: ${(props) => props.theme.textColor};
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    display: flex;
    align-items: center;
    padding: 20px;
    transition: color 0.2s ease-in;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.textColor};
  margin-top: 10px;
`;

const Loader = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 50px;
  padding: 30px 20px;
  margin: 20px 20px;
  text-align: center;
`;

const Img = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;

interface ICoin {
  english_name: string;
  korean_name: string;
  market: string;
}

interface ICoinsProps {
  toggleDark: () => void;
}

const Coins = () => {
  const { isLoading, data } = useQuery("allCoins", upbitCoins);

  return (
    <div>
      <Container>
        <Helmet>
          <title>Coins</title>
        </Helmet>
        <Header>
          <Title>Coins</Title>
          <button>Toggle Mode</button>
        </Header>
        {isLoading ? (
          <Loader>Please wait</Loader>
        ) : (
          <CoinsList>
            {data?.slice(0, 50).map((coin: ICoin) => (
              <Coin key={coin.market}>
                <Link
                  to={{
                    pathname: `/${coin.market}`,
                    state: { name: coin.english_name },
                  }}
                >
                  {/* <Img
                    src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                  /> */}
                  {coin.english_name} &rarr;
                </Link>
              </Coin>
            ))}
          </CoinsList>
        )}
      </Container>
    </div>
  );
};

export default Coins;

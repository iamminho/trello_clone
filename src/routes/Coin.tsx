import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { styled } from "styled-components";

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

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
  margin-top: 10px;
`;

const Loader = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 20px;
  padding: 30px 20px;
  margin: 20px 20px;
  text-align: center;
`;

interface RouteParams {
  coinId: string;
}

interface RouteState {
  name: string;
}

const Coin = () => {
  const { coinId } = useParams<RouteParams>();
  const [loading, setLoading] = useState(true);
  const { state } = useLocation<RouteState>();

  return (
    <Container>
      <Header>
        <Title>{state?.name || "Dose not right acess 404"}</Title>
      </Header>
      {loading ? <Loader>Please wait...</Loader> : null}
    </Container>
  );
};

export default Coin;

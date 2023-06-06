import styled from "styled-components";
import Circle from "./Circle";

function App() {
  return (
    <div>
      <Circle bgColor="teal" text="circle" />
      <Circle bgColor="tomato" borderColor="teal" />
    </div>
  );
}

export default App;

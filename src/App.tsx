import React from "react";
import { hourSelector, minuteState } from "./components/atoms";
import { useRecoilState, useRecoilValue } from "recoil";

function App() {
  const [minutes, setMinutes] = useRecoilState(minuteState);

  const hours = useRecoilValue(hourSelector);
  const onMinutesChange = (event: React.FormEvent<HTMLInputElement>) => {
    setMinutes(+event.currentTarget.value);
  };
  const onHoursChange = (event: React.FormEvent<HTMLInputElement>) => {
    setMinutes(+event.currentTarget.value * 60);
  };
  return (
    <>
      <input
        value={minutes}
        onChange={onMinutesChange}
        type="number"
        placeholder="Minutes"
      />
      <input
        value={hours}
        onChange={onHoursChange}
        type="number"
        placeholder="Hours"
      />
    </>
  );
}

export default App;

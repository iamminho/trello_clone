import { useRecoilValue } from "recoil";
import { IToDo } from "./atoms";

function ToDo({ text }: IToDo) {
  return (
    <li>
      <span>{text}</span>
      <button>todo</button>
      <button>Done</button>
      <button>Doing</button>
    </li>
  );
}

export default ToDo;

import { useRecoilValue } from "recoil";
import CreateToDo from "./CreateToDo";
import { toDoState } from "./atoms";
import ToDo from "./ToDo";

const ToDoList = () => {
  const toDos = useRecoilValue(toDoState);
  console.log(toDos);
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <CreateToDo />
      <ul>
        {toDos.map((todo) => (
          // <ToDo text={todo.text} category={todo.category} id={todo.id} />
          <ToDo key={todo.id} {...todo} />
        ))}
      </ul>
    </div>
  );
};

export default ToDoList;

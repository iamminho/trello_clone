import { useRecoilValue } from "recoil";
import CreateToDo from "./CreateToDo";
import { toDoSelector, toDoState } from "./atoms";
import ToDo from "./ToDo";

const ToDoList = () => {
  const [toDos, doing, done] = useRecoilValue(toDoSelector);

  return (
    <div>
      <h1>To Dos</h1>
      <CreateToDo />
      <hr />
      <h2>To Do</h2>
      <ul>
        {toDos.map((todo) => (
          // <ToDo text={todo.text} category={todo.category} id={todo.id} />
          <ToDo key={todo.id} {...todo} />
        ))}
      </ul>
      <hr />

      <h2>Doing</h2>
      <ul>
        {doing.map((doing) => (
          // <ToDo text={todo.text} category={todo.category} id={todo.id} />
          <ToDo key={doing.id} {...doing} />
        ))}
      </ul>
      <hr />

      <h2>To Do</h2>
      <ul>
        {done.map((done) => (
          // <ToDo text={todo.text} category={todo.category} id={todo.id} />
          <ToDo key={done.id} {...done} />
        ))}
      </ul>
      <hr />
    </div>
  );
};

export default ToDoList;

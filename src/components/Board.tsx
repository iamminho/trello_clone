import { Droppable } from "react-beautiful-dnd";
import DraggabbleCard from "./DraggabbleCard";
import { styled } from "styled-components";
import { useRef } from "react";

const Wrapper = styled.div`
  width: 300px;
  padding: 20px 10px;
  padding-top: 15px;
  margin: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

interface IAreaProps {
  isDraggingFromThisWith: boolean;
  isDraggingOver: boolean;
}

const Area = styled.div<IAreaProps>`
  border-radius: 5px;
  background-color: ${(props) =>
    props.isDraggingOver
      ? "white"
      : props.isDraggingFromThisWith
      ? "#DAFFFB"
      : "#c5dff8"};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
`;

interface IBoardProps {
  toDos: string[];
  boardId: string;
}

function Board({ toDos, boardId }: IBoardProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const onClick = () => {
    inputRef.current?.focus();
    setTimeout(() => {
      inputRef.current?.blur();
    }, 5000);
  };
  return (
    <>
      <Wrapper>
        <Title>{boardId}</Title>
        <input ref={inputRef} placeholder="grab me" />
        <button onClick={onClick}>click me</button>
        <Droppable droppableId={boardId}>
          {(magic, info) => (
            <Area
              isDraggingOver={info.isDraggingOver}
              isDraggingFromThisWith={Boolean(info.draggingFromThisWith)}
              ref={magic.innerRef}
              {...magic.droppableProps}
            >
              {toDos.map((toDo, index) => (
                <DraggabbleCard key={toDo} toDo={toDo} index={index} />
              ))}
              {magic.placeholder}
            </Area>
          )}
        </Droppable>
      </Wrapper>
    </>
  );
}

export default Board;

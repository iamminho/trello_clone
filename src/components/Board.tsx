import { Droppable } from "react-beautiful-dnd";
import DraggabbleCard from "./DraggabbleCard";
import { styled } from "styled-components";

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
  return (
    <>
      <Wrapper>
        <Title>{boardId}</Title>
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

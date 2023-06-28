import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

function App() {
  const onDragEnd = () => {};
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="one">
          {() => (
            <ul>
              <Draggable draggableId="1" index={0}>
                {() => <li>One</li>}
              </Draggable>
              <Draggable draggableId="2" index={1}>
                {() => <li>Two</li>}
              </Draggable>
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
}

export default App;

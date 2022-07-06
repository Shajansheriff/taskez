import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { reorderList } from "./reorder";

export default function Board() {
  const statuses = ["To do", "In Progress", "Done"];
  const [state, setState] = useState<{
    columns: Record<
      string,
      {
        id: string;
        name: string;
        items: { id: string; name: string; description: string }[];
      }
    >;
    columnOrder: string[];
  }>({
    columns: statuses.reduce((obj, status) => {
      const tasks = Array.from({ length: 2 }, (_, index) => {
        return {
          id: String(index + 1) + status,
          name: "Hello " + index + status,
          description: "lorem ipsum" + index,
        };
      });
      return {
        ...obj,
        [status]: { id: status, name: status, items: tasks },
      };
    }, {}),
    columnOrder: statuses,
  });

  function onDragEnd(result: any) {
    if (!result.destination) {
      return;
    }

    if (result.type === "column") {
      const columnOrder = reorderList(
        state.columnOrder,
        result.source.index,
        result.destination.index
      );
      setState({
        ...state,
        columnOrder,
      });
      return;
    }

    // reordering in same list
    if (result.source.droppableId === result.destination.droppableId) {
      const column = state.columns[result.source.droppableId];
      if (column) {
        const items = reorderList(
          column.items,
          result.source.index,
          result.destination.index
        );

        // updating column entry
        const newState = {
          ...state,
          columns: {
            ...state.columns,
            [column.id]: {
              ...column,
              items,
            },
          },
        };
        setState(newState);
      }
      return;
    }

    // moving between lists
    const sourceColumn = state.columns[result.source.droppableId]!;
    const destinationColumn = state.columns[result.destination.droppableId]!;
    const item = sourceColumn.items[result.source.index]!;

    // 1. remove item from source column
    const newSourceColumn = {
      ...sourceColumn,
      items: [...sourceColumn.items],
    };
    newSourceColumn.items.splice(result.source.index, 1);

    // 2. insert into destination column
    const newDestinationColumn = {
      ...destinationColumn,
      items: [...destinationColumn.items],
    };
    // in line modification of items
    newDestinationColumn.items.splice(result.destination.index, 0, item);

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newSourceColumn.id]: newSourceColumn,
        [newDestinationColumn.id]: newDestinationColumn,
      },
    };

    setState(newState);
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex flex-nowrap gap-6 overflow-x-auto">
        {Object.values(state.columns).map((column) => (
          <div
            key={column.id}
            className={clsx(
              "flex flex-col flex-shrink-0 h-screen bg-[#f5f9f9] p-4 gap-4",
              "rounded-2xl"
            )}
          >
            <div className="text-sm font-medium">{column.name}</div>
            <button className="bg-[#ECF3F3] text-center text-primary outline-primary py-3">
              +
            </button>
            <Droppable droppableId={column.id}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  className="flex-grow overflow-y-auto"
                >
                  {column.items.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(dragProvided, dragSnapshot) => (
                        <Link
                          href={`/tasks?taskId=${item.id}`}
                          as={`/tasks/${item.id}`}
                        >
                          <a
                            ref={dragProvided.innerRef}
                            {...dragProvided.draggableProps}
                            {...dragProvided.dragHandleProps}
                            className={clsx(
                              "block w-72",
                              "bg-white p-4 rounded-lg shadow select-none mb-4",
                              "outline-primary",
                              dragSnapshot.isDragging &&
                                "outline-none shadow-md bg-green-100"
                            )}
                          >
                            <div className="w-full space-y-4">
                              <h4 className="text-sm font-medium">
                                {item.name}
                              </h4>
                              <p className="text-xs text-[#6B6B6B]">
                                {item.description}
                              </p>
                            </div>
                          </a>
                        </Link>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
}

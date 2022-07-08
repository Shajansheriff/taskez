import { Status, Task } from "@prisma/client";
import clsx from "clsx";
import Link from "next/link";
import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { ROUTES } from "../../routes";
import { trpc } from "../../utils/trpc";
import { Avatar } from "../common/Avatar";
import { Loader } from "../common/Loader";
import { AddTask } from "./AddTask";
import { reorderList } from "./reorder";

export default function Board() {
  const { data, isLoading } = trpc.useQuery(["task.board"]);
  const { mutate } = trpc.useMutation(["task.update"]);
  const [state, setState] = useState<typeof data>();

  useEffect(() => {
    if (data) {
      setState(data);
    }
  }, [data]);

  function onDragEnd(result: any) {
    if (!state) {
      return;
    }
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

    const sourceDroppableId = result.source.droppableId as Status;
    const destinationDroppableId = result.destination.droppableId as Status;

    // reordering in same list
    if (sourceDroppableId === destinationDroppableId) {
      const column = state.columns[sourceDroppableId];
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
    const sourceColumn = state.columns[sourceDroppableId];
    const destinationColumn = state.columns[destinationDroppableId];
    if (!sourceColumn || !destinationColumn) {
      return;
    }
    const item = sourceColumn.items[result.source.index];

    if (!item) {
      return;
    }

    mutate({ id: item.id, status: destinationDroppableId });

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
  return isLoading ? (
    <Loader />
  ) : (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex h-full grow flex-nowrap overflow-y-auto gap-6">
        {Object.values(state?.columns ?? {}).map((column) => (
          <div
            key={column.id}
            className={clsx(
              "flex flex-col w-80 flex-shrink-0 h-full bg-[#f5f9f9] p-4 gap-4",
              "rounded-2xl"
            )}
          >
            <div className="text-sm font-medium capitalize">{column.name}</div>
            <AddTask status={column.id} />
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
                          href={`${ROUTES.app.tasks}?taskId=${item.id}`}
                          as={`${ROUTES.app.tasks}/${item.id}`}
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
                              <Avatar
                                src={item.createdBy.image ?? ""}
                                name={item.createdBy?.name ?? ""}
                                alt={item.createdBy?.name ?? ""}
                              />
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

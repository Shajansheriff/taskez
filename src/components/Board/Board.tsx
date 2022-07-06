export function Board() {
  const tasks = Array.from({ length: 20 }, (_, index) => {
    return {
      id: index + 1,
      name: "Hello " + index,
      description: "lorem ipsum" + index,
    };
  });
  return (
    <div className="flex gap-4">
      {["Todo", "In Progress", "Done"].map((status) => (
        <div
          key={status}
          className="flex flex-col h-full w-80 bg-[#F5F9F9] p-4"
        >
          <div className="text-sm font-medium">{status}</div>
          <div className="flex flex-col items-start flex-grow overflow-y-auto gap-5">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="bg-white w-full shadow rounded-lg p-4"
              >
                <div className="w-full space-y-4">
                  <h4 className="text-sm font-medium">{task.name}</h4>
                  <p className="text-xs text-[#6B6B6B]">{task.description}</p>
                </div>
              </div>
            ))}
          </div>
          {/* <div className="w-80 bg-[#F5F9F9] p-4">In progress</div>
                <div className="w-80 bg-[#F5F9F9] p-4">Completed</div> */}
        </div>
      ))}
    </div>
  );
}

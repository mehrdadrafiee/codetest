const data = [{
  id: "1",
  name: "laundry",
  isComplete: false
}, {
  id: "2",
  name: "car wash",
  isComplete: false
}, {
  id: "3",
  name: "shopping",
  isComplete: false
}]

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center lg:p-20 md:p-10 sm:p-5">
      <h1 className="text-xl">Todos List</h1>
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div className="z-10 w-full items-center justify-between font-mono text-sm">
          <ul>
            {data.map((todo) => {
              return (
                <li className="flex justify-between p-3 border-b-2 border-gray-500">
                  <div className="flex items-center">
                    <input id={todo.id} type="checkbox" className="mr-2" checked={todo.isComplete} />
                    <label htmlFor={todo.id} className={todo.isComplete ? "line-through" : ""}>{todo.name}</label>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </main>
  );
}

"use client"

import Todo from "./components/Todo";

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

export type TodoProps = {
  id: string;
  name: string;
  isComplete: boolean;
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center lg:p-20 md:p-10 sm:p-5">
      <h1 className="text-xl">Todos List</h1>
      <div className="z-10 w-full items-center justify-between font-mono text-sm">
        {data && data.length > 0 ?
          <ul>
            {data.map((todo) =>
              <Todo todo={todo} key={todo.id} />
            )}
          </ul>
          :
          <p className="text-center">No todos yet.</p>
        }
      </div>
    </main>
  );
}

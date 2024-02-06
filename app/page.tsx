"use client"

import { useState, useEffect } from "react";
import Todo from "./components/Todo";
import { v4 as uuidv4 } from 'uuid';
import { fetchTodos } from "@/lib/actions/todo.actions";

export type TodoProps = {
  id: string;
  name: string;
  isComplete: boolean;
}

export default function Home() {
  const [todos, setTodos] = useState<TodoProps[]>();

  useEffect(() => {
    fetchTodos()
      .then((data) => setTodos(data))
      .catch((error) => console.error("Error fetching todos:", error));
  }, [todos]);

  return (
    <main className="flex min-h-screen flex-col items-center lg:p-20 md:p-10 sm:p-5">
      <h1 className="text-xl">Todos List</h1>
      <div className="z-10 w-full items-center justify-between font-mono text-sm">
        {todos && todos.length > 0 ?
          <ul>
            {todos.map((todo) =>
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

"use client"

import { useState, useEffect } from "react";
import Todo from "./components/Todo";
import { v4 as uuidv4 } from 'uuid';
import { createTodo, fetchTodos } from "@/lib/actions/todo.actions";

export type TodoProps = {
  id: string;
  name: string;
  isComplete: boolean;
}

export default function Home() {
  const [todos, setTodos] = useState<TodoProps[]>();
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await createTodo({ id: uuidv4(), name: inputValue, isComplete: false })
      setInputValue("");
    } catch (error) {
      console.error("Failed to create a todo:", error);
    }
  };

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
      <div className="flex mt-8 lg:w-1/2 md:w-full">
        <input
          type="text"
          placeholder="New Todo..."
          className="w-full p-4"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)} />
        <button disabled={!inputValue} onClick={handleSubmit} className="text-white bg-gray-800 p-3 hover:bg-black disabled:bg-gray-300 disabled:text-gray-500 disabled:border-gray-300 disabled:cursor-not-allowed">Add</button>
      </div>
    </main>
  );
}

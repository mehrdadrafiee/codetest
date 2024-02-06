"use server";

import { TodoProps } from "@/app/page";
import Todo from "../models/todo.model";
import { connectToDB } from "../mongoose";

export async function fetchTodos() {
  try {
    await connectToDB()
    const todosQuery = Todo.find({})
    const todos = await todosQuery.exec();
    return todos;
  } catch (error: any) {
    throw new Error(`Failed to fetch todos: ${error.message}`);
  }
}

export async function createTodo({ id, name, isComplete = false }: TodoProps) {
  try {
    await connectToDB()
    await Todo.create({ id, name, isComplete });

  } catch (error: any) {
    throw new Error(`Error creating the todo: ${error.message}`);
  }
}
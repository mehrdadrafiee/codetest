"use server";

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
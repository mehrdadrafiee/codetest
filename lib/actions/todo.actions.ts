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

export async function toggleTodo({ id, name, isComplete }: TodoProps): Promise<void> {
  try {
    await connectToDB()
    await Todo.findOneAndUpdate(
      { id: id },
      { name, isComplete },
      { upsert: true }
    );
  } catch (error: any) {
    throw new Error(`Failed to update todo: ${error.message}`);
  }
}

export async function deleteTodo(id: string): Promise<void> {
  try {
    await connectToDB()
    await Todo.findOneAndDelete({ id })
  } catch (error: any) {
    throw new Error(`Failed to delete todo: ${error.message}`);
  }
}

export async function updateTodo(id: string, newName: string): Promise<void> {
  try {
    await connectToDB()
    await Todo.findOneAndUpdate(
      { id: id },
      { name: newName },
      { upsert: true }
    );
  } catch (error: any) {
    throw new Error(`Failed to create/update todo: ${error.message}`);
  }
}
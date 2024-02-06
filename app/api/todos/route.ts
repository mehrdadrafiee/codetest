import { TodoProps } from "@/app/page";
import { NextResponse } from "next/server";

const URL = "https://data.mongodb-api.com/app/data-kfntt/endpoint/data/v1/action/findOne"
const API_KEY: string = process.env.API_KEY as string

export async function GET() {
  const res = await fetch(URL)

  const todos: TodoProps[] = await res.json()
  return NextResponse.json(todos)
}

export async function DELETE(request: Request) {
  const { id }: Partial<TodoProps> = await request.json()

  if (!id) return NextResponse.json({ "message": "id is required" })

  await fetch(`${URL}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      'Access-Control-Request-Headers': '*',
      "api-key": API_KEY,
    }
  })

  return NextResponse.json({ "message": "todo is deleted" })
}

export async function POST(request: Request) {
  const { id, name }: Partial<TodoProps> = await request.json()

  if (!id || !name) return NextResponse.json({ "message": "missing required data" })

  const res = await fetch(`${URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'Access-Control-Request-Headers': '*',
      "api-key": API_KEY,
    },
    body: JSON.stringify({
      id, name, isComplete: false
    })
  })

  const newTodo: TodoProps = await res.json()

  return NextResponse.json(newTodo)
}

export async function PUT(request: Request) {
  const { id, name, isComplete }: TodoProps = await request.json()

  if (!id || !name || typeof (isComplete) !== "boolean") return NextResponse.json({ "message": "missing required data" })

  const res = await fetch(`${URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      'Access-Control-Request-Headers': '*',
      "api-key": API_KEY,
    },
    body: JSON.stringify({ id, name, isComplete })
  })

  const updatedTodo: TodoProps = await res.json()

  return NextResponse.json(updatedTodo)
}
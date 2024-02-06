import { TodoProps } from "@/app/page";
import { deleteTodo, toggleTodo, updateTodo } from "@/lib/actions/todo.actions";
import { useState } from "react"

export default function Todo({ todo }: { todo: TodoProps }) {
  const [isEditMode, setIsEditMode] = useState(false)
  const [newName, setNewName] = useState(todo.name);

  const handleEditButton = (e: any) => {
    e.preventDefault()
    setIsEditMode(true)
  }

  const handleCancelButton = (e: any) => {
    e.preventDefault()
    setIsEditMode(false)
  }

  const handleToggle = async (todo: TodoProps) => {
    try {
      await toggleTodo({ ...todo, isComplete: !todo.isComplete })
    } catch (error) {
      console.error("Failed to (un)mark todo:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTodo(id)
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  const handleSaveButton = async (e: any, id: string, newName: string) => {
    e.preventDefault()
    try {
      await updateTodo(id, newName)
      setIsEditMode(false)
    } catch (error) {
      console.error("Failed to update the todo:", error);
    }
  }

  return (
    <li className="flex justify-between p-3 border-b-2 border-gray-500">
      <div className="flex items-center">
        <input id={todo.id} onChange={(e) => handleToggle(todo)} type="checkbox" className="mr-2" checked={todo.isComplete} />
        {isEditMode ?
          <input type="text" className="p-3 w-60" autoFocus value={newName} onChange={(e) => setNewName(e.target.value)} />
          :
          <label htmlFor={todo.id} className={todo.isComplete ? "line-through" : ""}>{todo.name}</label>
        }
      </div>
      <div className="flex">
        {isEditMode ?
          <>
            <button onClick={handleCancelButton} className="mr-2 border-2 border-gray-300 p-3 hover:text-white hover:bg-gray-500 hover:border-gray-500">Cancel</button>
            <button disabled={newName.length === 0} onClick={(e) => handleSaveButton(e, todo.id, newName)} className="text-green-600 border-2 border-gray-300 p-3 hover:text-white hover:bg-green-600 hover:border-green-600 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500 disabled:border-gray-300">Save</button>
          </>
          :
          <>
            {!todo.isComplete &&
              <button onClick={handleEditButton} className="mr-2 border-2 border-gray-300 p-3 hover:text-white hover:bg-gray-500 hover:border-gray-500">Edit</button>
            }
            <button onClick={(e) => handleDelete(todo.id)} className="text-red-500 border-2 border-gray-300 p-3 hover:text-white hover:bg-red-500 hover:border-red-500">Delete</button>
          </>
        }
      </div>
    </li>
  )
}
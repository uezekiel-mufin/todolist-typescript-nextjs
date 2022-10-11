import React, { useState, useEffect, useLayoutEffect } from "react";
import { Todos } from "../interfaces/types";

const EditTodo = ({ todos, setTodos, editTodo, setEdit }: Todos) => {
  const [updatedDeadline, setUpdatedDeadline] = useState<string>("");
  const [updatedtodo, setUpdatedTodo] = useState<string>("");
  console.log(editTodo);

  const handleUpdate = () => {
    const newTodos = todos.map((todo) => {
      if (todo.id === editTodo.id) {
        return {
          todo: updatedtodo,
          deadline: updatedDeadline,
        };
      } else {
        return todo;
      }
    });
    setTodos(newTodos);
    setEdit(false);
  };

  useLayoutEffect(() => {
    setUpdatedDeadline(editTodo.deadline);
    setUpdatedTodo(editTodo.todo);
  }, []);

  console.log(updatedtodo);
  console.log(updatedDeadline);

  return (
    <div className='flex border-2 border-indigo-600 rounded-lg mb-8 '>
      <input
        type='text'
        name='todo'
        placeholder='Add a todo'
        value={updatedtodo}
        className=' border-2 border-indigo-600 border-solid text-sm flex-1 px-3 focus:outline-none'
        onChange={(e) => setUpdatedTodo(e.target.value)}
      />
      <input
        type='date'
        name='deadline'
        value={updatedDeadline}
        placeholder='deadline'
        className='w-[30%] border-2 border-indigo-600 border-solid text-sm px-2 focus:outline-none'
        onChange={(e) => setUpdatedDeadline(e.target.value)}
      />
      <button
        onClick={() => handleUpdate()}
        className='text-white bg-indigo-600 px-4 py-1 text-sm  hover:bg-red-200 capitalize transition-all duration-300 ease-in-out'
      >
        update Todo
      </button>
    </div>
  );
};

export default EditTodo;

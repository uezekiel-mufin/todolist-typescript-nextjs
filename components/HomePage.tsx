import React, { useCallback, useEffect, useState } from "react";
import { Todos } from "../interfaces/types";
import { AiOutlineEdit, AiOutlineCloseCircle } from "react-icons/ai";
import Cookies from "js-cookie";

const HomePage = ({ todos, setTodos }: Todos) => {
  const [deadline, setDeadline] = useState<string>("");
  const [todo, setTodo] = useState<string>("");
  const [red, setRed] = useState<string>("");
  const [green, setGreen] = useState<string>("");
  const [blue, setBlue] = useState<string>("");

  const handleSubmit = (): void => {
    const max = 200;
    const min = 0;
    setRed(Math.trunc(Math.random() * (max - min) - min).toString());
    setGreen(Math.trunc(Math.random() * (max - min) - min).toString());
    setBlue(Math.trunc(Math.random() * (max - min) - min).toString());
    const id = Date.now().toString();

    setTodos([
      ...todos,
      { todo, deadline, id, bg: `rgb(${red},${green},${blue})` },
    ]);
  };

  useEffect(() => {
    console.log(todos);
    console.log(todos);
    Cookies.set("todos", JSON.stringify(todos));
  }, [todos]);

  const handleDelete = (id) => {};

  const handleEdit = (id) => {};
  return (
    <div className='todo px-4 pt-8 '>
      <h2 className='todo_title px-8 font-bold text-center'>
        What is the Plan for Today
      </h2>
      <div className='flex mx-8 border-2 border-indigo-600 rounded-lg '>
        <input
          type='text'
          name='todo'
          placeholder='Add a todo'
          onChange={(e) => setTodo(e.target.value)}
          className=' border-2 border-indigo-600 border-solid flex-1 px-2 focus:outline-none'
        />
        <input
          type='date'
          name='deadline'
          placeholder='deadline'
          onChange={(e) => setDeadline(e.target.value)}
          className='w-[30%] border-2 border-indigo-600 border-solid px-2 focus:outline-none'
        />
        <button
          onClick={handleSubmit}
          className='text-white bg-indigo-600 px-2 py-1  hover:bg-red-200 transition-all duration-300 ease-in-out'
        >
          Add Todo
        </button>
      </div>

      <div className='flex flex-col gap-3 w-full'>
        {todos.map((todo) => (
          <div
            key={todo?.id}
            style={{ background: todo.bg }}
            className='rounded-lg p-2 flex justify-between text-sm'
          >
            <h4 className='text-white font-semibold'>{todo.todo}</h4>
            <span className='text-white font-semibold'>{todo.deadline}</span>
            <div className='todo_actions text-white flex gap-1'>
              <span onClick={handleDelete}>
                <AiOutlineCloseCircle />
              </span>
              <span onClick={handleEdit}>
                <AiOutlineEdit />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;

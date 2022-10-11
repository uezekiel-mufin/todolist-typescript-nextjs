import React, { useCallback, useEffect, useState } from "react";
import { Todos } from "../interfaces/types";
import { AiOutlineEdit, AiOutlineCloseCircle } from "react-icons/ai";
import Cookies from "js-cookie";
import EditTodo from "./EditTodo";

const HomePage = ({ todos, setTodos }: Todos) => {
  const [deadline, setDeadline] = useState<string>("");
  const [todo, setTodo] = useState<string>("");
  const [red, setRed] = useState<string>("");
  const [green, setGreen] = useState<string>("");
  const [blue, setBlue] = useState<string>("");
  const [edit, setEdit] = useState<Boolean>(false);
  const [editTodo, setEditTodo] = useState({});

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
    // setTodo("");
    // setDeadline("");
  };

  useEffect(() => {
    console.log(todos);
    console.log(todos);
    Cookies.set("todos", JSON.stringify(todos));
  }, [todos]);

  const handleDelete = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const handleEdit = (editTodo: Todos) => {
    setEdit(true);
    setEditTodo(editTodo);
  };
  return (
    <div className='todo px-4 pt-8 overflow-auto'>
      <h2 className='todo_title px-8 font-bold text-center'>
        What is the Plan for Today
      </h2>
      <div className='flex  border-2 border-indigo-600 rounded-lg mb-8 '>
        <input
          type='text'
          value={todo}
          name='todo'
          placeholder='Add a todo'
          onChange={(e) => setTodo(e.target.value)}
          className=' border-2 border-indigo-600 border-solid text-sm flex-1 px-3 focus:outline-none'
        />
        <input
          type='date'
          value={deadline}
          name='deadline'
          placeholder='deadline'
          onChange={(e) => setDeadline(e.target.value)}
          className='w-[30%] border-2 border-indigo-600 border-solid text-sm px-2 focus:outline-none'
        />
        <button
          onClick={handleSubmit}
          className='text-white bg-indigo-600 px-4 py-1 text-sm  hover:bg-red-200 transition-all duration-300 ease-in-out'
        >
          Add Todo
        </button>
      </div>
      {edit ? (
        <EditTodo
          todos={todos}
          setTodos={setTodos}
          editTodo={editTodo}
          setEdit={setEdit}
          id={""}
        />
      ) : (
        <div className='flex flex-col gap-3 w-full'>
          {todos.map((todo, index) => (
            <div
              key={todo?.id}
              style={{ background: todo.bg }}
              className='rounded-lg p-3 flex justify-between text-sm'
            >
              <h4 className='text-white font-semibold capitalize'>
                {`${index + 1}.`} {todo.todo}
              </h4>
              <span className='text-white font-semibold'>{todo.deadline}</span>
              <div className='todo_actions text-white flex gap-1'>
                <span onClick={() => handleDelete(todo.id)}>
                  <AiOutlineCloseCircle />
                </span>
                <span onClick={() => handleEdit(todo)}>
                  <AiOutlineEdit />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;

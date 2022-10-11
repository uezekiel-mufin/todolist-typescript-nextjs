import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { EditProps, Todos } from "../interfaces/types";
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
  const [editTodo, setEditTodo] = useState<EditProps | any>();

  let redd = "";
  let greenn = "";
  let bluee = "";

  const handleColor = () => {
    const max = 200;
    const min = 0;
    redd = Math.trunc(Math.random() * (max - min) - min).toString();
    greenn = Math.trunc(Math.random() * (max - min) - min).toString();
    bluee = Math.trunc(Math.random() * (max - min) - min).toString();
  };

  const handleSubmit = (): void => {
    setRed(redd);
    setGreen(greenn);
    setBlue(bluee);
    const id = Date.now().toString();
    setTodos([
      ...todos,
      { todo, deadline, id, bg: `rgb(${redd},${greenn},${bluee})` },
    ]);
  };

  useLayoutEffect(() => {
    handleColor();
  });

  useEffect(() => {
    Cookies.set("todos", JSON.stringify(todos));
  }, [todos]);

  const handleDelete = (id: string) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const handleEdit = (item: EditProps) => {
    setEdit(true);
    setEditTodo(item);
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
          onClick={() => {
            handleColor(), handleSubmit();
          }}
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
          deadline={""}
          bg={""}
          todo=''
        />
      ) : (
        <div className='flex flex-col gap-3 w-full'>
          {todos.map((item, index) => (
            <div
              key={item?.id}
              style={{ background: item.bg }}
              className='rounded-lg p-3 flex justify-between text-sm'
            >
              <h4 className='text-white font-semibold capitalize'>
                {`${index + 1}.`} {item.todo}
              </h4>
              <span className='text-white font-semibold'>{item.deadline}</span>
              <div className='todo_actions text-white flex gap-1'>
                <span onClick={() => handleDelete(item.id)}>
                  <AiOutlineCloseCircle />
                </span>
                <span onClick={() => handleEdit(item)}>
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

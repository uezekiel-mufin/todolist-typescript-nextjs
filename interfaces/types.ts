import { Dispatch, FC, SetStateAction } from "react";

export type Todos = {
  //   todo: { todo: string; deadline: string; bg: string; id: string };
  todos: { todo: string; deadline: string; bg: string; id: string }[];
  setEdit: Dispatch<React.SetStateAction<Boolean>>;
  setTodos: Dispatch<React.SetStateAction<{}[]>>;
  editTodo: {
    deadline: string;
    todo: string;
    id: string;
    bg: string;
  };
};

export type EditProps = {
  id: string;
  deadline: string;
  todo: string;
  bg: string;
};

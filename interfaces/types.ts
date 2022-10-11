import { Dispatch, FC, SetStateAction } from "react";

export type Todos = {
  todos: {}[];
  editTodo: {};
  id: string;
  setEdit: Dispatch<React.SetStateAction<Boolean>>;
  setTodos: Dispatch<React.SetStateAction<{}[]>>;
};

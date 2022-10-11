import { Dispatch, FC, SetStateAction } from "react";

export type Todos = {
  todos: {}[];
  id: string;
  setTodos: Dispatch<React.SetStateAction<{}[]>>;
};

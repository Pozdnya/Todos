import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITodo, ITodoState } from "../../types/interfaces";

export const initialState: ITodoState = {
  todos: [],
  deletedTodos: [],
  inputError: '',
  todoError: ''
}

export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<ITodo>) => {
      state.todos.push(action.payload)
    },
    setInputError: (state, action: PayloadAction<string>) => {
      state.inputError = action.payload
    },
    setTodoError: (state, action: PayloadAction<string>) => {
      state.todoError = action.payload
    },
    update: (state, action: PayloadAction<ITodo>) => {
      const index = state.todos.findIndex(todo => todo.id === action.payload.id)
      
      if (index !== -1) {
        state.todos[index] = action.payload
      }
    }
  }
})

export const { add, setInputError, update, setTodoError } = todoSlice.actions

export default todoSlice.reducer
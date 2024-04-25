import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITodo, ITodoState } from "../../types/interfaces";

export const initialState: ITodoState = {
  todos: [],
  deletedTodos: [],
  error: ''
}

export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<ITodo>) => {
      state.todos.push(action.payload)
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    },
    update: (state, action: PayloadAction<ITodo>) => {
      const index = state.todos.findIndex(todo => todo.id === action.payload.id)
      
      if (index !== -1) {
        state.todos[index] = action.payload
      }
    }
  }
})

export const { add, setError, update } = todoSlice.actions

export default todoSlice.reducer
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITodo, ITodoState } from "../../types/interfaces";
import { fetchTodos } from "../actions/actions";

export const initialState: ITodoState = {
  todos: [],
  deletedTodos: [],
  inputError: '',
  todoError: '',
  isLoading: false,
  loadingError: ''
}

export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<ITodo>) => {
      state.todos.unshift(action.payload)
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
    },
    remove: (state, action: PayloadAction<string>) => {
      const deletedTodo = state.todos.find(todo => todo.id === action.payload)

      if (deletedTodo) {
        state.deletedTodos.push(deletedTodo)
      }

      state.todos = state.todos.filter(todo => todo.id !== action.payload)
    },
    restore: (state, action: PayloadAction<string>) => {
      const restoredTodo = state.deletedTodos.find(todo => todo.id === action.payload)

      if (restoredTodo) {
        state.todos.push(restoredTodo)
      }

      state.deletedTodos = state.deletedTodos.filter(todo => todo.id !== action.payload)
    },
    toggleAll: (state, action: PayloadAction<boolean>) => {
      const toggledTodos = state.todos.map(todo => ({
        ...todo,
        completed: action.payload
      }))

      state.todos = toggledTodos
    },
    removeAll: (state) => {
      state.deletedTodos = [...state.deletedTodos, ...state.todos]
      state.todos = [];
    },
    removeCompleted: (state) => {
      const completedTodo = state.todos.filter(todo => todo.completed)
      state.todos = state.todos.filter(todo => !todo.completed)
      state.deletedTodos.push(...completedTodo)
    },
    restoreAll: (state) => {
      state.todos.push(...state.deletedTodos)
      state.deletedTodos = []
    },
    restoreAllUncomplited: (state) => {
      const uncompletedTodos = state.deletedTodos.filter(todo => !todo.completed)
      state.todos.push(...uncompletedTodos)
      state.deletedTodos = state.deletedTodos.filter(todo => todo.completed)
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action: PayloadAction<ITodo[]>) => {
        state.isLoading = false;
        state.todos = [...state.todos, ...action.payload];
        state.loadingError = '';
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loadingError = action.error.message || '';
        state.isLoading = false;
      })
  },
})

export const {
  add,
  setInputError,
  update,
  setTodoError,
  remove,
  restore,
  toggleAll,
  removeAll,
  removeCompleted,
  restoreAll,
  restoreAllUncomplited,
} = todoSlice.actions

export default todoSlice.reducer
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { ITodo } from "../../types/interfaces";

export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async () => {
    const response = await axios.get<ITodo[]>('https://jsonplaceholder.typicode.com/todos', { params: { _limit: 10 } })

    const normalizeData = response.data.map(todo => ({
      ...todo,
      id: uuidv4()
    }))
    return normalizeData
  }
)
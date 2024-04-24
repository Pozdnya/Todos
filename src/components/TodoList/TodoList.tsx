import { useAppSelector } from "../../store/hooks"
import TodoItem from "../TodoItem/TodoItem"

const TodoList = () => {
  const { todos } = useAppSelector(state => state.todos)

  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  )
}

export default TodoList

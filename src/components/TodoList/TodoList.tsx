import { FC } from "react"
import { useAppSelector } from "../../store/hooks"
import { TodoListModeEnum } from "../../types/enums"
import TodoItem from "../TodoItem/TodoItem"
import DeletedItem from "../DeletedItem/DeletedItem"

interface Props {
  mode: TodoListModeEnum
}

const TodoList: FC<Props> = ({ mode }) => {
  const todos = useAppSelector(
    state => (mode === TodoListModeEnum.ACTIVE) ? state.todos.todos : state.todos.deletedTodos
  )

  return (
    <div>
      {!todos.length && <p>
        {TodoListModeEnum.ACTIVE ? "Haven't todos yet" : "Haven't deleted todos yet"}
      </p>}
      {!!todos.length && (
        <ul className="todo-list">
          {todos.map(todo => 
            (mode === TodoListModeEnum.ACTIVE) 
              ? <TodoItem key={todo.id} todo={todo} />
              : <DeletedItem key={todo.id} todo={todo} />
          )}
        </ul>
      )}
    </div>
  )
}

export default TodoList

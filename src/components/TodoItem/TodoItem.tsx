import { FC } from "react"
import { ITodo } from "../../types/interfaces"

interface Props {
  todo: ITodo
}

const TodoItem: FC<Props> = ({todo}) => {
  return (
    <li className="todo">
      <input type="checkbox" checked={todo.completed} className="todo__completed"/>
      <input type="text" disabled={true} value={todo.title} className="todo__title"/>
    </li>
  )
}

export default TodoItem

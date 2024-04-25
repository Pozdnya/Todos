import TodoList from "../../components/TodoList/TodoList"
import { TodoListModeEnum } from "../../types/enums"

const DeletedTodos = () => {
  return (
    <div className="del-todos">
      <h1 className="del-todos__title">Deleted Todos</h1>
      <TodoList mode={TodoListModeEnum.DELETED}/>
    </div>
  )
}

export default DeletedTodos

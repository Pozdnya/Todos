import TodoList from "../../components/TodoList/TodoList"
import Form from "../../components/UI/Form/Form"
import { TodoListModeEnum } from "../../types/enums"

const Todos = () => {
  return (
    <div className="todos">
      <h1 className="todos__title">Todos</h1>
      <Form />
      <TodoList mode={TodoListModeEnum.ACTIVE} />
    </div>
  )
}

export default Todos

import TodoList from "../../components/TodoList/TodoList"
import Form from "../../components/UI/Form/Form"

const Todos = () => {
  return (
    <div className="todos">
      <h1 className="todos__title">Todos</h1>
      <Form />
      <TodoList />
    </div>
  )
}

export default Todos

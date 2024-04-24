import Form from "../../components/UI/Form/Form"
import { useAppSelector } from "../../store/hooks"

const Todos = () => {
  const { todos } = useAppSelector(state => state.todos)
  return (
    <div className="todos">
      <h1 className="todos__title">Todos</h1>
      <Form />
      <div>
        {todos.map(todo => (
          <div key={todo.id}>
            <p>{todo.title}</p>
            <input type="checkbox" checked={todo.completed} onChange={() => { }} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Todos

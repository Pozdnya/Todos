import { FC } from "react"
import { ITodo } from "../../types/interfaces"
import Button from "../UI/Button/Button"
import { MdOutlineDeleteForever } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import Input from "../UI/Input/Input";
import { InputTypeEnum } from "../../types/enums";

interface Props {
  todo: ITodo
}

const TodoItem: FC<Props> = ({ todo }) => {
  return (
    <li className="todo">
      <Input
        type={InputTypeEnum.CHECKBOX}
        checked={todo.completed}
        classes="todo__completed"
      />
      <Input
        value={todo.title}
        classes="todo__title"
        disabled={true}
      />
      <div className="todo__actions">
        <Button>
          <MdOutlineDeleteForever />
        </Button>

        <Button>
          <MdModeEdit />
        </Button>
      </div>
    </li>
  )
}

export default TodoItem

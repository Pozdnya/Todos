import { FC } from "react"
import cn from 'classnames';
import { FaTrashRestore } from "react-icons/fa";

import { ITodo } from "../../types/interfaces"
import { InputTypeEnum } from "../../types/enums"

import Input from "../UI/Input/Input"
import Button from "../UI/Button/Button";
import { useAppDispatch } from "../../store/hooks";
import { restore } from "../../store/features/todoSlice";

interface Props {
  todo: ITodo
}

const DeletedItem: FC<Props> = ({ todo }) => {
  const dispatch = useAppDispatch()

  const onRestoreHandler = () => {
    dispatch(restore(todo.id))
  }

  return (
    <li className={cn("todo",
      {"todo--checked": todo.completed}
    )}>
      <div className="todo__content">

        <Input
          type={InputTypeEnum.CHECKBOX}
          checked={todo.completed}
          classes="todo__completed"
          disabled={true}
        />

        <p className={cn("todo__title",
          { "todo__title--checked": todo.completed })}
        >
          {todo.title}
        </p>

        <Button onClick={onRestoreHandler}>
          <FaTrashRestore />
        </Button>
      </div>
      <div className="todo__error"></div>
    </li>
  )
}

export default DeletedItem

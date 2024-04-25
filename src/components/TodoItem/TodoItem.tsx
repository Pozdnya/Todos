import { FC, useState } from "react"
import cn from 'classnames';

import { ITodo } from "../../types/interfaces"
import { InputTypeEnum } from "../../types/enums";

import { MdOutlineDeleteForever, MdModeEdit, MdCancel } from "react-icons/md";
import { FaCheck } from "react-icons/fa";

import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button"

import { useAppDispatch } from "../../store/hooks";
import { update } from "../../store/features/todoSlice";

interface Props {
  todo: ITodo
}

const TodoItem: FC<Props> = ({ todo }) => {
  const [checked, setChecked] = useState<boolean>(todo.completed)
  const [isEdited, setIsEdited] = useState<boolean>(false)
  const dispatch = useAppDispatch()

  const onCheckHandler = () => {
    setChecked(!checked)

    const updatedTodo = {
      ...todo,
      completed: !checked
    }

    dispatch(update(updatedTodo))
  }

  const onEditHandler = () => {
    setIsEdited(!isEdited)
  }

  return (
    <li className="todo">
      <Input
        type={InputTypeEnum.CHECKBOX}
        checked={checked}
        classes="todo__completed"
        onChange={onCheckHandler}
        disabled={isEdited}
      />

      {isEdited
        ? (<Input
          value={todo.title}
          classes="todo__title"
          disabled={!isEdited}
        />)
        : (
          <p className={cn("todo__title",
            { "todo__title--checked": checked })}
          >
            {todo.title}
          </p>
        )
      }
      {!isEdited
        ? (<div className="todo__actions">
          <Button>
            <MdOutlineDeleteForever />
          </Button>

          <Button onClick={onEditHandler}>
            <MdModeEdit />
          </Button>
        </div>)
        : (<div className="todo__actions">
          <Button>
            <FaCheck />
          </Button>

          <Button onClick={onEditHandler}>
            <MdCancel />
          </Button>
        </div>)}
    </li>
  )
}

export default TodoItem

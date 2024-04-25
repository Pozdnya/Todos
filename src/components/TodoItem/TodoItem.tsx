import { ChangeEvent, FC, useState } from "react"
import cn from 'classnames';

import { ITodo } from "../../types/interfaces"
import { InputTypeEnum } from "../../types/enums";

import { MdOutlineDeleteForever, MdModeEdit, MdCancel } from "react-icons/md";
import { FaCheck } from "react-icons/fa";

import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button"

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setError, update } from "../../store/features/todoSlice";
import Error from "../Error/Error";

interface Props {
  todo: ITodo
}

const TodoItem: FC<Props> = ({ todo }) => {
  const [checked, setChecked] = useState<boolean>(todo.completed)
  const [isEdited, setIsEdited] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState(todo.title)
  const dispatch = useAppDispatch()
  const { error } = useAppSelector(state => state.todos)

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

  const onUpdateInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const onCofirmUpdateInputValueHandler = () => {
    if (!inputValue) {
      dispatch(setError("Can't be empty"))
      return;
    }

    const updatedTodo = {
      ...todo,
      title: inputValue,
    }

    dispatch(update(updatedTodo))
    setIsEdited(false)
    dispatch(setError(''))
  }

  return (
    <li className="todo">
      <div className="todo__content">

        <Input
          type={InputTypeEnum.CHECKBOX}
          checked={checked}
          classes="todo__completed"
          onChange={onCheckHandler}
          disabled={isEdited}
        />

        {isEdited ? (<Input
          value={inputValue}
          classes="todo__title"
          onChange={onUpdateInputHandler}
        />) : (<p className={cn("todo__title",
          { "todo__title--checked": checked })}
        >
          {todo.title}
        </p>)}

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
            <Button onClick={onCofirmUpdateInputValueHandler}>
              <FaCheck />
            </Button>

            <Button onClick={onEditHandler}>
              <MdCancel />
            </Button>
          </div>)}
      </div>
      <Error error={error}>{error}</Error>
    </li>
  )
}

export default TodoItem

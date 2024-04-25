import { ChangeEvent, FC, useCallback, useEffect, useState } from "react"
import cn from 'classnames';

import { ITodo } from "../../types/interfaces"
import { InputTypeEnum } from "../../types/enums";

import { MdOutlineDeleteForever, MdModeEdit, MdCancel } from "react-icons/md";
import { FaCheck } from "react-icons/fa";

import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button"

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { update, setTodoError, remove } from "../../store/features/todoSlice";
import Error from "../Error/Error";

interface Props {
  todo: ITodo
}

const TodoItem: FC<Props> = ({ todo }) => {
  const [checked, setChecked] = useState<boolean>(false)
  const [isEdited, setIsEdited] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>(todo.title)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const dispatch = useAppDispatch()
  const { todoError } = useAppSelector(state => state.todos)
  
  useEffect(() =>{
    setChecked(todo.completed)
  }, [todo.completed])

  const onCheckHandler = useCallback(() => {
    setChecked(!checked)

    const updatedTodo = {
      ...todo,
      completed: !checked
    }

    dispatch(update(updatedTodo))
  }, [dispatch, checked, todo])

  const onEditHandler = useCallback(() => {
    setIsEdited(!isEdited)
    dispatch(setTodoError(''))
    setInputValue(todo.title)
  }, [dispatch, isEdited, todo.title])

  const onUpdateInputHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }, [])

  const onCofirmUpdateInputValueHandler = useCallback(() => {
    setSelectedId(todo.id)
    if (!inputValue) {
      dispatch(setTodoError("Can't be empty"))
      return;
    }

    const updatedTodo = {
      ...todo,
      title: inputValue,
    }

    dispatch(update(updatedTodo))
    setIsEdited(false)
    dispatch(setTodoError(''))
  }, [dispatch, inputValue, todo])

  const onDeleteHandler = useCallback(() => {
    dispatch(remove(todo.id))
  }, [dispatch, todo.id])

  return (
    <li className={cn("todo",
      { "todo--checked": checked }
    )}>
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
          ? (
            <div className="todo__actions">
              <Button onClick={onDeleteHandler}>
                <MdOutlineDeleteForever />
              </Button>

              <Button onClick={onEditHandler}>
                <MdModeEdit />
              </Button>
            </div>
          )
          : (
            <div className="todo__actions">
              <Button onClick={onCofirmUpdateInputValueHandler}>
                <FaCheck />
              </Button>

              <Button onClick={onEditHandler}>
                <MdCancel />
              </Button>
            </div>
          )}
      </div>
      <div className="todo__error">
        {selectedId === todo.id && <Error>{todoError}</Error>}
      </div>
    </li>
  )
}

export default TodoItem

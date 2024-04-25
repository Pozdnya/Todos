import { ChangeEvent, FormEvent, useState } from "react"
import { v4 as uuidv4 } from 'uuid';
import Input from "../Input/Input";
import Button from "../Button/Button";
import { ButtonTypeEnum } from "../../../types/enums"
import { ITodo } from "../../../types/interfaces";
import { useAppDispatch } from "../../../store/hooks";
import { add } from "../../../store/features/todoSlice";

const Form = () => {
  const [query, setQuery] = useState<string>('');
  const [inputError, setInputError] = useState<boolean>(false)
  const dispatch = useAppDispatch()

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
    setInputError(false)
  }

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!query) {
      setInputError(true)
      return;
    }

    const newTodo: ITodo = {
      id: uuidv4(),
      title: query,
      completed: false,
    }

    dispatch(add(newTodo))

    setQuery('')
  }

  return (
    <form className="form" onSubmit={submitHandler}>
      <div className="form__actions">
        <Input
          value={query}
          onChange={onChangeHandler}
          placeholder="Enter todo"
          classes="form__actions-input"
        />
        <Button
          type={ButtonTypeEnum.SUBMIT}
          classes="form__actions-button"
        >
          Add
        </Button>
      </div>
      <div className="form__error">
        {inputError && <span className="form__error-message">Can't be empty</span>}
      </div>
    </form>
  )
}

export default Form

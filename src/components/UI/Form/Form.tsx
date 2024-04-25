import { ChangeEvent, FormEvent, useState } from "react"
import { v4 as uuidv4 } from 'uuid';
import Input from "../Input/Input";
import Button from "../Button/Button";
import { ButtonTypeEnum } from "../../../types/enums"
import { ITodo } from "../../../types/interfaces";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { add, setError } from "../../../store/features/todoSlice";
import Error from "../../Error/Error";

const Form = () => {
  const [query, setQuery] = useState<string>('');
  const dispatch = useAppDispatch()
  const { error } = useAppSelector(state => state.todos)

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
    dispatch(setError(""))
  }

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!query) {
      dispatch(setError("Can't be empty"))
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
      <Error error={error}>{error}</Error>
    </form>
  )
}

export default Form

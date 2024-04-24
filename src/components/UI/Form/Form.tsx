import { ChangeEvent, FormEvent, useState } from "react"
import { v4 as uuidv4 } from 'uuid';
import Input from "../Input/Input";
import Button from "../Button/Button";
import { ButtonTypeEnum } from "../../../types/enums"
import { ITodo } from "../../../types/interfaces";

const Form = () => {
  const [query, setQuery] = useState<string>('');
  const [inputError, setInputError] = useState<boolean>(false)

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

    console.log(newTodo);
    //dispatch new todo

    setQuery('')
  }

  return (
    <form className="form" onSubmit={submitHandler}>
      <div className="form__actions">
        <Input value={query} onChange={onChangeHandler} />
        <Button type={ButtonTypeEnum.SUBMIT}>Add</Button>
      </div>
      <div className="form__error">
        {inputError && <span className="form__error-message">Can't be empty</span>}
      </div>
    </form>
  )
}

export default Form

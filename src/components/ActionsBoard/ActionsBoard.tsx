import { FC, useState } from "react"

import { InputTypeEnum, TodoListModeEnum } from "../../types/enums"

import Button from "../UI/Button/Button"
import Input from "../UI/Input/Input"

import { useAppDispatch } from "../../store/hooks"
import { removeAll, removeCompleted, restoreAll, restoreAllUncomplited, toggleAll } from "../../store/features/todoSlice"

interface Props {
  mode: TodoListModeEnum
}

const ActionsBoard: FC<Props> = ({ mode }) => {
  const [checked, setChecked] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const isActiveMode = mode === TodoListModeEnum.ACTIVE
  const isDeletedMode = mode === TodoListModeEnum.DELETED

  const onCheckHandler = () => {
    const newChecked = !checked;
    setChecked(newChecked)

    dispatch(toggleAll(newChecked))
  }

  const onDeleteAllHandler = () => {
    dispatch(removeAll())
  }

  const onDeleteSelectedHandler = () => {
    dispatch(removeCompleted())
  }

  const onRestoreAll = () => {
    dispatch(restoreAll())
  }

  const onRestoreUncomplited = () => {
    dispatch(restoreAllUncomplited())
  }

  return (
    <>
      {isActiveMode && (<div className="actions-board">
        <div className="actions-board__input">
          <label htmlFor="selecAll" className="actions-board__input-label">Select All</label>
          <Input
            type={InputTypeEnum.CHECKBOX}
            id="selecAll"
            checked={checked}
            onChange={onCheckHandler}
          />
        </div>

        <div className="actions-board__actions">
          <Button onClick={onDeleteAllHandler}>Delete All</Button>
          <Button onClick={onDeleteSelectedHandler}>Delete Selected</Button>
        </div>
      </div>)}
      {isDeletedMode && (
        <div className="actions-board">
          <Button onClick={onRestoreAll}>
            Restore All
          </Button>
          <Button onClick={onRestoreUncomplited}>
            Restore All Uncomplited
          </Button>
        </div>
      )}
    </>
  )
}

export default ActionsBoard

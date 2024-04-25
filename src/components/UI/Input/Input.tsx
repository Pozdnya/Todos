import { ChangeEvent, FC } from "react"
import cn from 'classnames'
import { InputTypeEnum } from "../../../types/enums";

interface Props {
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  type?: InputTypeEnum;
  placeholder?: string;
  classes?: string;
  checked?: boolean;
  disabled?: boolean;
  id?: string;
}

const Input: FC<Props> = ({
  value,
  onChange,
  type = 'text',
  placeholder,
  classes,
  checked,
  disabled,
  id,
}) => {

  return (
    <div className="input">
      <input
        type={type}
        className={cn("input__field", classes)}
        placeholder={placeholder}
        onChange={onChange}
        value={value && value}
        checked={checked}
        disabled={disabled}
        id={id}
      />
    </div>
  )
}

export default Input

import { FC, ReactNode } from "react"
import cn from 'classnames'
import { ButtonTypeEnum } from '../../../types/enums'
interface Props {
  children: ReactNode;
  type?: ButtonTypeEnum;
  onClick?: () => void;
  classes?: string;
}

const Button: FC<Props> = ({ children, type = ButtonTypeEnum.BUTTON, onClick, classes }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={cn('button', classes)}
    >
      {children}
    </button>
  )
}

export default Button

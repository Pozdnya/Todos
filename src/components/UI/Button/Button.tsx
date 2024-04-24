import { FC, ReactNode } from "react"
import { ButtonTypeEnum } from '../../../types/enums'

interface Props {
  children: ReactNode;
  type: ButtonTypeEnum;
  onClick?: () => void;
}

const Button: FC<Props> = ({ children, type, onClick }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className='button'
    >
      {children}
    </button>
  )
}

export default Button

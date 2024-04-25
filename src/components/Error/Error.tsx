import { FC, ReactNode } from "react"

interface Props {
  children: ReactNode;
  error: string;
}
const Error: FC<Props> = ({ children, error }) => {
  return (
    <div className="error">
      {!!error.length && <span className="error__message">{children}</span>}
    </div>
  )
}

export default Error

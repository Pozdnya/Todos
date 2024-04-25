import { FC, ReactNode } from "react"

interface Props {
  children: ReactNode;
}

const Error: FC<Props> = ({ children }) => {
  return (
    <span className="error-message">{children}</span>
  )
}

export default Error

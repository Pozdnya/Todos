import { ChangeEvent, FC } from "react"
 
interface Props {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
 }

const Input: FC<Props> = ({value, onChange}) => {

  return (
    <div className="input">
      <input
        type="text"
        className="input__field"
        placeholder="Enter todo"
        onChange={onChange}
        value={value}
      />
    </div>
  )
}

export default Input

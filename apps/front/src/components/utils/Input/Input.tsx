import { FieldValues, Path, UseFormRegister } from "react-hook-form"
import { css } from "../../../../styled-system/css"
import { vstack } from "../../../../styled-system/patterns"

export interface InputProps {
  type?: React.HTMLInputTypeAttribute
  label: Path<FieldValues>
  register: UseFormRegister<FieldValues>
  required?: boolean
}

const Input = ({ type = 'text', label, register, required = false }: InputProps): JSX.Element => {
  return (
    <div className={vstack({ gap: 2, alignItems: 'left'})}>
      <label className={css({ textStyle: 'body' })}>{label} {required && <span className={css({ color: 'violet.600'})}>*</span>}</label>
      <input className={css({ padding: 3, border: "#000 solid 2px", rounded: "md", textStyle: 'body' })} type={type} {...register(label, { required })}/>
    </div>
  )
}

export default Input
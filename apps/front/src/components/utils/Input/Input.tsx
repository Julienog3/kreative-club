import React from "react";
import {
  Control,
  FieldValues,
  Path,
  UseFormRegister,
  useController,
} from "react-hook-form";
import { css } from "../../../../styled-system/css";
import { vstack } from "../../../../styled-system/patterns";
import { useTranslation } from 'next-i18next'
import { toCamelCase } from "../../../helpers/format";

export interface InputProps {
  type?: React.HTMLInputTypeAttribute;
  label: Path<FieldValues>;
  register: UseFormRegister<FieldValues>;
  required?: boolean;
  control?: Control<FieldValues>;
}

const Input = ({
  type = "text",
  label,
  register,
  required = false,
  control,
}: InputProps): JSX.Element => {
  const {
    fieldState: { error },
  } = useController({ name: label, control });

  const { t } = useTranslation();

  return (
    <div className={vstack({ gap: 1, alignItems: "left" })}>
      <label className={css({ textStyle: "body" })}>
        {t(`form.${label}.label`)}
        {required && (
          <span className={css({ color: "purple", ml: ".25rem" })}>*</span>
        )}
      </label>
      <input
        className={css({
          padding: ".5rem",
          border: "#000 solid 2px",
          rounded: ".5rem",
          textStyle: "body",
        })}
        type={type}
        autoComplete={type === "password" ? "new-password" : ""}
        {...register(label, { required })}
      />
      {error && (
        <p
          role="alert"
          className={css({ textStyle: "body", color: "red.400" })}
        >
          {t(`form.${label}.errors.${toCamelCase(error.message!)}`)}
        </p>
      )}
    </div>
  );
};

export default Input;

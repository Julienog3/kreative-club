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
import { useTranslation } from "react-i18next";
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
          <span className={css({ color: "violet.600", ml: 1 })}>*</span>
        )}
      </label>
      <input
        className={css({
          padding: 3,
          border: "#000 solid 2px",
          rounded: "md",
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

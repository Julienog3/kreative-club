import { FieldValues, RegisterOptions, useFormContext } from "react-hook-form";
import { css } from "#root/styled-system/css";
import { vstack } from "#root/styled-system/patterns";
import { ChangeEvent, useState } from "react";
import { dropzone } from "./Dropzone.style";

interface DropzoneProps {
  label: string;
  options?: RegisterOptions<FieldValues>;
}

export const Dropzone = ({ label, options }: DropzoneProps) => {
  const { register } = useFormContext();

  const [selectedImage, setSelectedImage] = useState<File>();
  const selectedImageUrl: string | null = selectedImage
    ? URL.createObjectURL(selectedImage)
    : null;

  const previewImage = (event: ChangeEvent<HTMLInputElement>): void => {
    if (!event.target.files) return;
    setSelectedImage(event.target.files[0]);
  };

  return (
    <div className={vstack({ gap: ".5rem", alignItems: "start" })}>
      <p className={css({ textStyle: "body" })}>
        {label}
        {options?.required && (
          <span className={css({ color: "purple", ml: ".25rem" })}>*</span>
        )}
      </p>
      <label
        htmlFor="dropzone"
        className={vstack({
          alignItems: "center",
          justifyContent: "center",
          minH: "8rem",
          borderRadius: "10px",
          border: "2px dashed black",
          p: "1rem",
          w: "100%",
          cursor: "pointer",
          transition: "background",
          _hover: {
            bgColor: "gray",
          },
        })}
      >
        {selectedImageUrl && (
          <img
            className={css({
              w: "6rem",
              borderRadius: "10px",
              border: "2px solid black",
            })}
            src={selectedImageUrl}
          />
        )}
        <p className={css({ textStyle: "body" })}>
          Faites glisser et déposez vos fichiers ici ou{" "}
          <span className={css({ color: "purple" })}>naviguez</span>
        </p>
        <input
          id="dropzone"
          type="file"
          className={dropzone()}
          {...register(label, {...options, onChange: (e) => previewImage(e)})}
        />
      </label>
    </div>
  );
};
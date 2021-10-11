import {
  forwardRef,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
} from "react";
import { FieldError } from "react-hook-form";

import styles from "./styles.module.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  error?: FieldError;
}

const InputDefault: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { label, id, error, ...props }: InputProps,
  ref
) => {
  return (
    <div className={styles["form-group"]}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input id={id} className={styles["form-control"]} {...props} ref={ref} />
      <span className={styles.bar}></span>
      {error && <p className={styles.error}>{error.message}</p>}
    </div>
  );
};

export const Input = forwardRef(InputDefault);

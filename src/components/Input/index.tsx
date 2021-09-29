import { InputHTMLAttributes } from "react";
import styles from "./styles.module.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
}

export const Input = ({ label, id, ...props }: InputProps) => {
  return (
    <div className={styles["form-group"]}>
      <label htmlFor={id}>{label}</label>
      <input id={id} className={styles["form-control"]} {...props} />
    </div>
  );
};

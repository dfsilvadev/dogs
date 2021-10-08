import { ButtonHTMLAttributes, FormEvent, ReactNode } from "react";

import styles from "./styles.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  handleSignIn?: (event: FormEvent<HTMLButtonElement>) => void;
}

export function Button({ children, handleSignIn, ...props }: ButtonProps) {
  return (
    <button onClick={handleSignIn} {...props} className={styles["btn-default"]}>
      {children}
    </button>
  );
}

import { AccoutNavLinks } from "../AccountNavLinks";

import styles from "./styles.module.scss";

interface AccountNavHeaderProps {
  title: string;
}

export const AccountNavHeader = ({ title }: AccountNavHeaderProps) => {
  return (
    <header className={styles.header}>
      <h1 className="title">{title}</h1>
      <AccoutNavLinks />
    </header>
  );
};

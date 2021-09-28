import { ReactNode } from "react";
import { Footer } from "../Footer";
import { Header } from "../Header";

import styles from "./styles.module.scss";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={styles.wrapper}>
      <Header />
      <div className="container">{children}</div>
      <Footer />
    </div>
  );
};

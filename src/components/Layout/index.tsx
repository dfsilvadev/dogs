import { ReactNode } from "react";
import { Footer } from "../Footer";
import { Header } from "../Header";

import styles from "./styles.module.scss";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <main className={styles.wrapper}>
      <Header />
      <section className="container">{children}</section>
      <Footer />
    </main>
  );
};

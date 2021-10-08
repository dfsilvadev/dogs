import styles from "./styles.module.scss";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <img src={"/images/logo.svg"} alt="" />
      <p>Dogs &bull; Alguns direitos reservados.</p>
    </footer>
  );
};

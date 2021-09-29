import { Link, NavLink } from "react-router-dom";

import styles from "./styles.module.scss";

export const Header = () => {
  return (
    <header className={styles.header}>
      <nav className="container">
        <Link to="/" className={styles.logo}>
          <img
            src={"/images/logo.svg"}
            alt="Logotipo dogs - um desenho de cachorro sorrindo"
            aria-label="Logotipo dogs - um desenho de cachorro sorrindo"
          />
        </Link>
        <NavLink to="/login">Login</NavLink>
      </nav>
    </header>
  );
};

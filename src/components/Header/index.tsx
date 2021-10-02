import { Link, NavLink } from "react-router-dom";
import { RiUserSettingsLine } from "react-icons/ri";

import { useAuth } from "../../hooks/useAuth";

import styles from "./styles.module.scss";

export const Header = () => {
  const { user } = useAuth();

  console.log(user);

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
        {!!user ? (
          <NavLink to="/conta">
            {user.username}
            <RiUserSettingsLine />
          </NavLink>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
      </nav>
    </header>
  );
};

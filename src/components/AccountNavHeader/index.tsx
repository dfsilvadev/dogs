import {
  TiChartAreaOutline,
  TiExportOutline,
  TiPlusOutline,
  TiThLargeOutline,
} from "react-icons/ti";
import { NavLink, useRouteMatch } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";

import styles from "./styles.module.scss";

export const AccountNavHeader = () => {
  const { url } = useRouteMatch();
  const { signOut } = useAuth();

  return (
    <header className={styles.header}>
      <h1 className="title">Minha Conta</h1>
      <nav>
        <NavLink to={`${url}`}>
          <TiThLargeOutline />
        </NavLink>

        <NavLink to={`${url}/estatisticas`}>
          <TiChartAreaOutline />
        </NavLink>

        <NavLink to={`${url}/novo-post`}>
          <TiPlusOutline />
        </NavLink>
        <span onClick={signOut}>
          <TiExportOutline />
        </span>
      </nav>
    </header>
  );
};

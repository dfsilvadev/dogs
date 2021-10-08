import { useState } from "react";
import {
  TiChartAreaOutline,
  TiExportOutline,
  TiPlusOutline,
  TiThLargeOutline,
} from "react-icons/ti";
import { NavLink, useRouteMatch } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";
import { useMediaMatch } from "../../hooks/useMediaMatch";

import styles from "./styles.module.scss";

export const AccoutNavLinks = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const { url } = useRouteMatch();
  const { signOut } = useAuth();
  const { match } = useMediaMatch("(max-width: 575px)");

  console.log(match);

  return (
    <>
      {match && (
        <button
          type="button"
          aria-label="Menu"
          className={`${styles["btn-mobile"]} ${
            toggleMenu && styles["btn-mobile-active"]
          }`}
          onClick={() => setToggleMenu(!toggleMenu)}
        ></button>
      )}
      <nav
        className={`${match ? styles["mobile-nav"] : styles.nav} ${
          toggleMenu && styles["mobile-nav-active"]
        }`}
      >
        <NavLink to={`${url}`} exact>
          <TiThLargeOutline />
          {match && <p>Minhas fotos</p>}
        </NavLink>

        <NavLink to={`${url}/estatisticas`}>
          <TiChartAreaOutline />
          {match && <p>Estatísticas</p>}
        </NavLink>

        <NavLink to={`${url}/novo-post`}>
          <TiPlusOutline />
          {match && <p>Nova Postage</p>}
        </NavLink>
        <span onClick={signOut}>
          <TiExportOutline />
          {match && <p>Sair</p>}
        </span>
      </nav>
    </>
  );
};

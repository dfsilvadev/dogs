import { useEffect, useState } from "react";
import { useLocation } from "react-router";

import { AccountNavHeader } from "../../components/AccountNavHeader";
import { converteToArray } from "../../utils/converteToArray";
import { removeEmptyElements } from "../../utils/removeEmptyElements";

import styles from "../../styles/pages/Account.module.scss";
import { AccountRoutes } from "../../routes/account";

export const Account = () => {
  const [title, setTitle] = useState("");
  const { pathname } = useLocation();

  useEffect(() => {
    const paths = converteToArray(pathname, "/");
    const newPaths = removeEmptyElements(paths);

    if (newPaths.length <= 1) {
      setTitle("Postagens");
      return;
    }

    if (newPaths.length > 1 && newPaths.includes("estatisticas")) {
      setTitle("Estatisticas");
      return;
    }

    if (newPaths.length > 1 && newPaths.includes("novo-post")) {
      setTitle("Nova Postagem");
      return;
    }
  }, [pathname]);

  return (
    <section className={styles.wrapper}>
      <div className="container">
        <AccountNavHeader title={title} />
        <AccountRoutes />
      </div>
    </section>
  );
};

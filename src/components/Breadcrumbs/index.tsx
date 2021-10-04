import { Link } from "react-router-dom";
import { RiArrowLeftSLine } from "react-icons/ri";

import styles from "./styles.module.scss";

export const Breadcrumbs = () => {
  return (
    <Link to="/login" className={styles.breadcrumbs}>
      <RiArrowLeftSLine />
      Voltar
    </Link>
  );
};

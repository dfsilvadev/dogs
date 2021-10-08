import { LoginRoutes } from "../../routes/login";

import styles from "../../styles/pages/Login.module.scss";

export const Login = () => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.form}>
        <LoginRoutes />
      </div>
    </section>
  );
};

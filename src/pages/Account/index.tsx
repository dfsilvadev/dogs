import { AccountNavHeader } from "../../components/AccountNavHeader";

import styles from "../../styles/pages/Account.module.scss";

export const Account = () => {
  return (
    <section className={styles.wrapper}>
      <div className="container">
        <AccountNavHeader />
      </div>
    </section>
  );
};

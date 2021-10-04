import { Route, Routes } from "react-router-dom";
import { SignInForm } from "../../components/SignInForm";

import styles from "../../styles/pages/Login.module.scss";

export const Login = () => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.form}>
        <Routes>
          <Route path="/" element={<SignInForm />} />
          <Route path="cadastrar" element={<p>Cadastrar</p>} />
          <Route path="esqueci-a-senha" element={<p>Esqueci minha senha</p>} />
        </Routes>
      </div>
    </section>
  );
};

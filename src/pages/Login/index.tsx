import { Route, Routes } from "react-router-dom";

import { SignInForm } from "../../components/SignInForm";
import { SignUpForm } from "../../components/SignUpForm";

import styles from "../../styles/pages/Login.module.scss";

export const Login = () => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.form}>
        <Routes>
          <Route path="/" element={<SignInForm />} />
          <Route path="esqueci-a-senha" element={<p>Esqueci minha senha</p>} />
          <Route path="cadastrar" element={<SignUpForm />} />
        </Routes>
      </div>
    </section>
  );
};

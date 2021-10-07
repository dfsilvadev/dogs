import { Route, Switch, useRouteMatch } from "react-router-dom";

import { SignInForm } from "../../components/SignInForm";
import { SignUpForm } from "../../components/SignUpForm";

import styles from "../../styles/pages/Login.module.scss";

export const Login = () => {
  const { path } = useRouteMatch();
  return (
    <section className={styles.wrapper}>
      <div className={styles.form}>
        <Switch>
          <Route exact path={path} component={SignInForm} />
          {/* <Route
            path="esqueci-a-senha"
            component={<p>Esqueci minha senha</p>}
          /> */}
          <Route path={`${path}/cadastrar`} component={SignUpForm} />
        </Switch>
      </div>
    </section>
  );
};

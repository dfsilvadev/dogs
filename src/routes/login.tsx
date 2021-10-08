import { Route, Switch, useRouteMatch } from "react-router-dom";

import { SignInForm } from "../components/SignInForm";
import { SignUpForm } from "../components/SignUpForm";

export const LoginRoutes = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path} component={SignInForm} />
      <Route
        path={`${path}/esqueci-a-senha`}
        component={() => <p>Esqueci minha senha</p>}
      />
      <Route path={`${path}/cadastrar`} component={SignUpForm} />
    </Switch>
  );
};

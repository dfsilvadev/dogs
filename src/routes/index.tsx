import { Route, Switch } from "react-router-dom";

import { UseAuthContextProvider } from "../contexts/useAuth";

import { Layout } from "../components/Layout";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { Conta } from "../pages/Account";
import { PrivateRoute } from "./private";

export const MyRoutes = () => {
  return (
    <UseAuthContextProvider>
      <Layout>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <PrivateRoute path="/minha-conta" component={Conta} />
        </Switch>
      </Layout>
    </UseAuthContextProvider>
  );
};

import { Switch, useRouteMatch } from "react-router-dom";
import { PrivateRoute } from "./private";

export const AccountRoutes = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <PrivateRoute
        exact
        path={path}
        component={() => <h1>Minhas postagens</h1>}
      />
      <PrivateRoute
        path={`${path}/estatisticas`}
        component={() => <h1>Estatísticas</h1>}
      />
      <PrivateRoute
        path={`${path}/novo-post`}
        component={() => <h1>Nova Postagem</h1>}
      />
    </Switch>
  );
};

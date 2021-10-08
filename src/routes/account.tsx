import { Route, Switch, useRouteMatch } from "react-router-dom";

export const AccountRoutes = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path} component={() => <h1>Minhas postagens</h1>} />
      <Route
        path={`${path}/estatisticas`}
        component={() => <h1>Estatísticas</h1>}
      />
      <Route
        path={`${path}/novo-post`}
        component={() => <h1>Nova Postagem</h1>}
      />
    </Switch>
  );
};

import { Switch, useRouteMatch } from "react-router-dom";

import { PrivateRoute } from "./private";

import { PhotoPost } from "../pages/PhotoPost";
import { Feed } from "../pages/Feed";

export const AccountRoutes = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <PrivateRoute exact path={path} component={Feed} />
      <PrivateRoute
        path={`${path}/estatisticas`}
        component={() => <h1>Estatísticas</h1>}
      />
      <PrivateRoute path={`${path}/novo-post`} component={PhotoPost} />
    </Switch>
  );
};

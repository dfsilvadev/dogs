import { Redirect, Route, RouteProps } from "react-router-dom";

import { useCookies } from "../hooks/useCookies";

interface PrivateRouteProps extends RouteProps {}

export const PrivateRoute = ({ ...props }: PrivateRouteProps) => {
  const { token } = useCookies();

  return token ? <Route {...props} /> : <Redirect to="/login" />;
};

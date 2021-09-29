import { Route, Routes } from "react-router-dom";

import { Home } from "../pages/Home";
import { Login } from "../pages/Login";

export const MyRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="login/" element={<Login />}>
        <Route path="cadastrar" element={<p>Cadastrar</p>} />
        <Route path="esqueci-a-senha" element={<p>Esqueci minha senha</p>} />
      </Route>
    </Routes>
  );
};

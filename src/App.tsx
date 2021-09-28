import { BrowserRouter } from "react-router-dom";

import { Layout } from "./components/Layout";
import { MyRoutes as Routes } from "./routes";

import "./styles/global.scss";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes />
      </Layout>
    </BrowserRouter>
  );
}

export default App;

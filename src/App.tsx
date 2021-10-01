import { BrowserRouter } from "react-router-dom";

import { Layout } from "./components/Layout";
import { UseAuthContextProvider } from "./contexts/useAuth";
import { MyRoutes as Routes } from "./routes";

import "./styles/global.scss";

function App() {
  return (
    <UseAuthContextProvider>
      <BrowserRouter>
        <Layout>
          <Routes />
        </Layout>
      </BrowserRouter>
    </UseAuthContextProvider>
  );
}

export default App;

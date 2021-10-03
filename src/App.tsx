import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { UseAuthContextProvider } from "./contexts/useAuth";
import { MyRoutes as Routes } from "./routes";

import { Layout } from "./components/Layout";

import "./styles/global.scss";

function App() {
  return (
    <BrowserRouter>
      <UseAuthContextProvider>
        <Layout>
          <Routes />
          <ToastContainer autoClose={3000} />
        </Layout>
      </UseAuthContextProvider>
    </BrowserRouter>
  );
}

export default App;

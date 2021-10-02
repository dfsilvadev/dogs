import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { UseAuthContextProvider } from "./contexts/useAuth";
import { MyRoutes as Routes } from "./routes";

import { Layout } from "./components/Layout";

import "./styles/global.scss";

function App() {
  return (
    <UseAuthContextProvider>
      <BrowserRouter>
        <Layout>
          <Routes />
          <ToastContainer autoClose={3000} />
        </Layout>
      </BrowserRouter>
    </UseAuthContextProvider>
  );
}

export default App;

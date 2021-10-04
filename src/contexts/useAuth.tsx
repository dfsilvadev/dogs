import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import { useCookies } from "../hooks/useCookies";
import { api } from "../services/api";

interface AuthContextProviderProps {
  children: ReactNode;
}

interface AuthContextData {
  user: User;
  isLogged: boolean;
  loading: boolean;
  signOut: () => void;
  signIn: (credentials: Credentials) => Promise<void>;
  signUp: (signUpData: SignUpData) => Promise<void>;
  getUserData: (token: string) => Promise<void>;
}

interface Credentials {
  username: string;
  password: string;
}

interface SignUpData extends Credentials {
  email: string;
}

interface User {
  id: string;
  email: string;
  nome: string;
  username: string;
}

export const UseAuthContext = createContext({} as AuthContextData);

export const UseAuthContextProvider = ({
  children,
}: AuthContextProviderProps) => {
  const [user, setUser] = useState<User>({} as User);
  const [isLogged, setIsLogged] = useState(false);
  const [loading, setLoading] = useState(false);
  const { cookies, token } = useCookies();
  const navigate = useNavigate();

  const signOut = useCallback(() => {
    try {
      cookies.remove("dogs.token");
      setIsLogged(false);
      setUser({} as User);
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message, {
          theme: "colored",
          icon: false,
        });
      }
    } finally {
      navigate("/login");
    }
  }, [cookies, navigate]);

  async function signIn({ username, password }: Credentials) {
    try {
      setLoading(true);
      const response = await api
        .post(
          "jwt-auth/v1/token",
          { username, password },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => response.data);

      const { token } = response;
      cookies.set("dogs.token", token);

      await getUserData(token);
      setIsLogged(true);

      navigate("/");
    } catch (err) {
      setIsLogged(false);
      setLoading(false);
      toast.error("Usuário ou senha incorreto.", {
        theme: "colored",
        icon: false,
      });
    } finally {
      setLoading(false);
    }
  }

  async function signUp({ username, email, password }: SignUpData) {
    try {
      setLoading(true);
      await api
        .post(
          "api/user",
          { username, email, password },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => response);
      toast.success("Usuário cadastrado com sucesso", {
        theme: "colored",
        icon: false,
      });
      navigate("login");
    } catch (err) {
      setIsLogged(false);
      setLoading(false);
      toast.error("Erro ao cadastrar usuário", {
        theme: "colored",
        icon: false,
      });
    } finally {
      setLoading(false);
    }
  }

  async function getUserData(token: string) {
    try {
      const data = await api
        .get("api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => response.data);

      setUser(data);
      setIsLogged(true);
    } catch (err) {
      setIsLogged(false);
      if (err instanceof Error) {
        toast.error(err.message, {
          theme: "colored",
          icon: false,
        });
      }
    }
  }

  useEffect(() => {
    if (token) {
      (async () => {
        await getUserData(token);
      })();
    }
  }, [token]);

  return (
    <UseAuthContext.Provider
      value={{ user, isLogged, loading, signOut, getUserData, signIn, signUp }}
    >
      {children}
    </UseAuthContext.Provider>
  );
};

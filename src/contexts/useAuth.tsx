import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useHistory } from "react-router";
import { toast } from "react-toastify";

import { useCookies } from "../hooks/useCookies";
import { api } from "../services/api";

interface AuthContextProviderProps {
  children: ReactNode;
}

interface AuthContextData {
  user: User | null;
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
  const [user, setUser] = useState<User | null>(null);
  const isLogged = !!user;
  const [loading, setLoading] = useState(false);
  const { cookies, token } = useCookies();
  const history = useHistory();

  const signOut = useCallback(() => {
    try {
      cookies.remove("dogs.token");
      setUser(null);
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message, {
          theme: "colored",
          icon: false,
        });
      }
    } finally {
      history.push("/login");
    }
  }, [cookies, history]);

  async function signIn({ username, password }: Credentials) {
    try {
      setLoading(true);
      await api
        .post(
          "jwt-auth/v1/token",
          { username, password },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          const { data } = response;
          const { token } = data;
          cookies.set("dogs.token", token);
          getUserData(token);
        });
      history.push("/minha-conta");
    } catch (err) {
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
      await api.post(
        "api/user",
        { username, email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Usuário cadastrado com sucesso", {
        theme: "colored",
        icon: false,
      });

      history.push("/login");
    } catch (err) {
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
      setLoading(true);
      await api
        .get("api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const { data } = response;
          setUser(data);
        });
    } catch (err) {
      setLoading(false);
      if (err instanceof Error) {
        toast.error(err.message, {
          theme: "colored",
          icon: false,
        });
      }
    } finally {
      setLoading(false);
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

import { createContext, ReactNode, useEffect, useState } from "react";
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
  signIn: (credentials: Credentials) => Promise<void>;
  getUserData: (token: string) => Promise<void>;
}

interface Credentials {
  username: string;
  password: string;
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
      setIsLogged(true);
      await getUserData(token);

      console.log(response);
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

  async function getUserData(token: string) {
    try {
      const data = await api
        .get("api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => response.data);

      const { id, nome, username, email } = data;
      setUser({
        id,
        nome,
        email,
        username,
      });

      setIsLogged(true);
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message, {
          theme: "colored",
          icon: false,
        });
      }
      setIsLogged(false);
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
      value={{ user, isLogged, loading, getUserData, signIn }}
    >
      {children}
    </UseAuthContext.Provider>
  );
};

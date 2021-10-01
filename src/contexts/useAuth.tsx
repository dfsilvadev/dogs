import { createContext, ReactNode, useEffect, useState } from "react";

import { useCookies } from "../hooks/useCookies";
import { api } from "../services/api";

interface AuthContextProviderProps {
  children: ReactNode;
}

interface AuthContextData {
  user: User;
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
  const { cookies, token } = useCookies();

  async function signIn({ username, password }: Credentials) {
    try {
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

      console.log(response);
    } catch (err) {
      console.log(err);
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

      return data;
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (token) {
      (async () => {
        const data = await getUserData(token);
        const { id, nome, username, email } = data;

        setUser({
          id,
          nome,
          email,
          username,
        });
      })();
    }
  }, [token]);

  return (
    <UseAuthContext.Provider value={{ user, getUserData, signIn }}>
      {children}
    </UseAuthContext.Provider>
  );
};

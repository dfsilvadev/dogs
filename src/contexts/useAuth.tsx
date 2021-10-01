import { createContext, ReactNode } from "react";
import { useCookies } from "../hooks/useCookies";
import { api } from "../services/api";

interface AuthContextProviderProps {
  children: ReactNode;
}

interface AuthContextData {
  signIn: (credentials: Credentials) => Promise<void>;
  getUserData: (token: string) => Promise<void>;
}

interface Credentials {
  username: string;
  password: string;
}

export const UseAuthContext = createContext({} as AuthContextData);

export const UseAuthContextProvider = ({
  children,
}: AuthContextProviderProps) => {
  const { cookies } = useCookies();

  async function signIn({ username, password }: Credentials) {
    try {
      const response = await api
        .post(
          "json/jwt-auth/v1/token",
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
      const response = api.get("api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <UseAuthContext.Provider value={{ signIn, getUserData }}>
      {children}
    </UseAuthContext.Provider>
  );
};

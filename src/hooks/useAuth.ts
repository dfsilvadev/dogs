import { useContext } from "react";
import { UseAuthContext } from "../contexts/useAuth";

export const useAuth = () => useContext(UseAuthContext);

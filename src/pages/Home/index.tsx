import { useAuth } from "../../hooks/useAuth";

import { Button } from "../../components/Button";

export const Home = () => {
  const { signOut } = useAuth();

  return (
    <div className="container">
      <p>Home</p>
      <Button type="button" onClick={signOut}>
        Sair
      </Button>
    </div>
  );
};

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useAuth } from "../../hooks/useAuth";

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { useNavigate } from "react-router";

interface Credentials {
  username: string;
  password: string;
}

const createUserFormSchema = yup.object({
  username: yup.string().required("E-mail obrigatório."),
  password: yup
    .string()
    .required("Senha obrigatória.")
    .min(6, "A senha deve conter 6 ou mais caracteres"),
});

export const Login = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createUserFormSchema),
  });

  const { errors } = formState;

  async function handleSignIn(credentials: Credentials) {
    await signIn(credentials);
    navigate("/");
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit(handleSignIn)}>
        <Input
          type="text"
          label="Usuário"
          id="username"
          error={errors.username}
          {...register("username")}
        />
        <Input
          type="password"
          label="Senha"
          id="password"
          error={errors.password}
          {...register("password")}
        />
        <Button type="submit">Entrar</Button>
      </form>
    </div>
  );
};

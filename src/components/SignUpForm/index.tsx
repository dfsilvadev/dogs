import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useAuth } from "../../hooks/useAuth";

import { Button } from "../Button";
import { Input } from "../Input";

import styles from "./styles.module.scss";

interface Credentials {
  username: string;
  email: string;
  password: string;
}

const createUserFormSchema = yup.object({
  username: yup.string().required("Usuário obrigatório."),
  email: yup
    .string()
    .required("E-mail obrigatório.")
    .email("Formato de e-mail inválido."),
  password: yup
    .string()
    .required("Senha obrigatória.")
    .min(6, "A senha deve conter 6 ou mais caracteres"),
});

export const SignUpForm = () => {
  const { signUp } = useAuth();
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createUserFormSchema),
  });

  const { errors } = formState;

  async function handleSignIn(credentials: Credentials) {
    await signUp(credentials);
  }

  return (
    <div className={`${styles["wrapper-form"]} float-left`}>
      <form onSubmit={handleSubmit(handleSignIn)} className={styles.form}>
        <h1 className="title">Cadastre-se</h1>
        <Input
          type="text"
          label="Usuário"
          id="username"
          placeholder="JhonDoe"
          error={errors.username}
          {...register("username")}
        />
        <Input
          type="email"
          label="E-mail"
          id="email"
          placeholder="jhondoe@email.com"
          error={errors.email}
          {...register("email")}
        />
        <Input
          type="password"
          label="Senha"
          id="password"
          placeholder="Sua senha"
          error={errors.password}
          {...register("password")}
        />
        <Button type="submit">Cadastrar</Button>
      </form>
      <div className={styles.registration}>
        <h1 className="title">Login</h1>
        <p>
          Já tem uma conta?
          <Link to="/login">Clique aqui</Link>
        </p>
      </div>
    </div>
  );
};

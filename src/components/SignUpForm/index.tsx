import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useAuth } from "../../hooks/useAuth";

import { Button } from "../Button";
import { Input } from "../Input";

import styles from "./styles.module.scss";
import { Breadcrumbs } from "../Breadcrumbs";

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
  const { signIn } = useAuth();
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createUserFormSchema),
  });

  const { errors } = formState;

  async function handleSignIn(credentials: Credentials) {
    await signIn(credentials);
  }

  return (
    <div className={`${styles["wrapper-form"]} float-left`}>
      <Breadcrumbs />
      <form onSubmit={handleSubmit(handleSignIn)} className={styles.form}>
        <h1 className="title">Cadastre-se</h1>
        <Input
          type="text"
          label="Usuário"
          id="username"
          error={errors.username}
          {...register("username")}
        />
        <Input
          type="email"
          label="E-mail"
          id="email"
          error={errors.email}
          {...register("email")}
        />
        <Input
          type="password"
          label="Senha"
          id="password"
          error={errors.password}
          {...register("password")}
        />
        <Button type="submit">Cadastrar</Button>
      </form>
    </div>
  );
};

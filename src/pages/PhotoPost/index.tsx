import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

import styles from "../../styles/pages/PhotoPost.module.scss";
import { useCookies } from "../../hooks/useCookies";
import { usePost } from "../../hooks/usePost";

const postSchema = yup.object({
  name: yup.string().required("Nome obrigatório."),
  weight: yup.string().required("Peso obrigatório."),
  age: yup.string().required("Idade obrigatório."),
  photo: yup.mixed().test("O arquivo é muito grande", (value) => {
    if (!value.length) return true; // attachment is optional
    return value[0].size <= 3350000;
  }),
});

export const PhotoPost = () => {
  const { token } = useCookies();
  const { preview, postPreview, sendPost } = usePost(token);

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(postSchema),
  });
  const { errors } = formState;

  return (
    <section
      className={`${styles["new-post-wrapper"]} float-left`}
      onSubmit={handleSubmit(sendPost)}
    >
      <form>
        <Input
          type="text"
          label="Nome"
          id="name"
          error={errors.name}
          {...register("name")}
        />

        <div className={styles.group}>
          <Input
            type="number"
            label="Peso"
            id="weight"
            error={errors.weight}
            {...register("weight")}
          />
          <Input
            type="number"
            label="Idade"
            id="age"
            error={errors.age}
            {...register("age")}
          />
        </div>

        <Input
          type="file"
          label="Selecionar Foto"
          id="photo"
          error={errors.photo}
          {...register("photo")}
          onChange={postPreview}
        />
        <Button type="submit">Postar</Button>
      </form>

      <div className={styles["wrap-preview"]}>
        {preview.url ? (
          <div
            className={styles.preview}
            style={{
              backgroundImage: `url('${preview.url}')`,
            }}
          ></div>
        ) : (
          <h4>Nenhum arquivo selecionado</h4>
        )}
      </div>
    </section>
  );
};

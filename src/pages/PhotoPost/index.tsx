import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import styles from "../../styles/pages/PhotoPost.module.scss";

export const PhotoPost = () => {
  return (
    <section className={`${styles["new-post-wrapper"]} float-left`}>
      <form>
        <Input
          type="text"
          label="Nome"
          id="name"
          // error={errors.username}
          // {...register("username")}
        />
        <Input
          type="number"
          label="Peso"
          id="weight"
          // error={errors.username}
          // {...register("username")}
        />
        <Input
          type="number"
          label="Idade"
          id="age"
          // error={errors.username}
          // {...register("username")}
        />
        <Input
          type="file"
          label="Selecionar Foto"
          id="photo"
          // error={errors.username}
          // {...register("username")}
        />
        <Button type="submit">Postar</Button>
      </form>
    </section>
  );
};

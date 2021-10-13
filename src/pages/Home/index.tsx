import { PostSection } from "../../components/PostSection";
import styles from "../../styles/pages/Home.module.scss";

export const Home = () => {
  return (
    <section className={styles["home-wrapper"]}>
      <div className="container">
        <PostSection />
      </div>
    </section>
  );
};

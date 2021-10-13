import { TiEyeOutline } from "react-icons/ti";

import styles from "./styles.module.scss";

interface Post {
  acessos: string;
  author: string;
  date: string;
  id: number;
  idade: string;
  peso: string;
  src: string;
  title: string;
  total_comments: string;
}

interface PostItemProps {
  post: Post;
}

export const PostItem = ({ post }: PostItemProps) => {
  return (
    <li className={styles.post}>
      <img src={post.src} alt={post.title} />
      <span>
        <TiEyeOutline /> {post.acessos}
      </span>
    </li>
  );
};

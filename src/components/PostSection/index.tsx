import { useEffect, useState } from "react";

import { useCookies } from "../../hooks/useCookies";
import { usePost } from "../../hooks/usePost";

import { PostItem } from "../PostItem";

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

export const PostSection = () => {
  const [posts, setPosts] = useState<Post[]>();
  const { token } = useCookies();
  const { loading, getPosts } = usePost(token);

  useEffect(() => {
    (async () => {
      const data = await getPosts({
        page: 1,
        total: 6,
        user: 0,
      });

      setPosts(data);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loading ? (
    <h1>Loading...</h1>
  ) : (
    <section className="float-left">
      <ul className={styles.feed}>
        {posts && posts.map((post) => <PostItem key={post.id} post={post} />)}
      </ul>
    </section>
  );
};

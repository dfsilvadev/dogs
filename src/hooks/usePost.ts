import { ChangeEvent, useState } from "react";
import { useHistory } from "react-router";
import { toast } from "react-toastify";

import { api } from "../services/api";

interface PostSendData {
  name: string;
  weight: string;
  age: string;
  photo?: any;
}

interface PostsGetData {
  page: number;
  total: number;
  user: any;
}

interface Preview {
  url: any;
  raw: any;
}

export const usePost = (token: string) => {
  const [preview, setPreview] = useState<Preview>({} as Preview);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const history = useHistory();

  async function sendPost(post: PostSendData) {
    try {
      setSending(true);
      const formData = new FormData();
      formData.append("img", post.photo[0]);
      formData.append("nome", post.name);
      formData.append("peso", post.weight);
      formData.append("idade", post.age);

      await api.post("api/photo", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      history.push("/minha-conta");
    } catch (err) {
      setSending(false);
      toast.error("Erro ao publicar seu post.", {
        theme: "colored",
        icon: false,
      });
    } finally {
      setSending(false);
    }
  }

  async function getPosts({ page, total, user }: PostsGetData) {
    try {
      setLoading(true);
      const data = await api
        .get(`api/photo/?_page=${page}&_total=${total}&_user=${user}`)
        .then((response) => response.data);

      return data;
    } catch (err) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  function postPreview({ target }: ChangeEvent<HTMLInputElement>) {
    setPreview({
      url: URL.createObjectURL((target.files as FileList)[0]),
      raw: (target.files as FileList)[0],
    });
  }

  return { preview, postPreview, sending, loading, sendPost, getPosts };
};

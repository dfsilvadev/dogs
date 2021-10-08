import { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";
import { api } from "../services/api";

interface PostData {
  name: string;
  weight: string;
  age: string;
  photo?: any;
}

interface Preview {
  url: any;
  raw: any;
}

export const usePost = (token: string) => {
  const [preview, setPreview] = useState<Preview>({} as Preview);

  async function sendPost(post: PostData) {
    try {
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
    } catch (err) {
      toast.error("Erro ao publicar seu post.", {
        theme: "colored",
        icon: false,
      });
    }
  }

  function postPreview({ target }: ChangeEvent<HTMLInputElement>) {
    setPreview({
      url: URL.createObjectURL((target.files as FileList)[0]),
      raw: (target.files as FileList)[0],
    });
  }

  return { preview, postPreview, sendPost };
};

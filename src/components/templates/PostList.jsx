import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { deletePost, getPost } from "../../services/user";

import styles from "./PostList.module.css";
import Loader from "../modules/Loader";
import { sp } from "../../utils/numbers";
import toast from "react-hot-toast";

const PostList = () => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery(["my-post-list"], getPost);

  const { mutate } = useMutation(deletePost, {
    onSuccess: () => {
      queryClient.invalidateQueries("my-post-list");
      toast.success("با موقفیت حذف شد");
    },
  });

  const deleteHandler = (id) => {
    mutate(id);
  };

  return (
    <div className={styles.list}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h3>آگهی های شما</h3>
          {data.data.posts.map((post) => (
            <div key={post._id} className={styles.post}>
              <img
                src={`${import.meta.env.VITE_BASE_URL}${post.images[0]}`}
                alt=""
              />
              <div>
                <p>{post.options.title}</p>
                <span>{post.options.content}</span>
              </div>
              <div className={styles.price}>
                <p>{new Date(post.createdAt).toLocaleDateString("fa-IR")}</p>
                <span>{sp(post.amount)} تومان</span>
              </div>
              <button onClick={() => deleteHandler(post._id)}>delete</button>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default PostList;

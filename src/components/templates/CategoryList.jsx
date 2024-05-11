import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteCategory, getCategory } from "../../services/admin";
import Loader from "../modules/Loader";
import toast from "react-hot-toast";

import styles from "./CategoryList.module.css";

const CategoryList = () => {
  const queryClient = useQueryClient();

  const { isLoading, data } = useQuery(["get-categories"], getCategory);
  const { mutate } = useMutation(deleteCategory, {
    onSuccess: () => {
      queryClient.invalidateQueries("get-categories");
      toast.success("با موقفیت حذف شد")
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
        data.data.map((i) => (
          <div key={i._id}>
            <img src={`${i.icon}.svg`} alt={i.name} />
            <h5>{i.name}</h5>
            <button onClick={() => deleteHandler(i._id)}>delete</button>
            <p>slug:{i.slug}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default CategoryList;

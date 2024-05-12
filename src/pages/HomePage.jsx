import Main from "../components/templates/Main";
import SideBar from "../components/templates/SideBar";
import Loader from "../components/modules/Loader";

import { useQuery } from "@tanstack/react-query";
import { getAllPost } from "../services/user";
import { getCategory } from "../services/admin";

const HomePage = () => {
  const style = { display: "flex" };
  const { data: posts, isLoading: loadingPost } = useQuery(
    ["post-list"],
    getAllPost
  );
  const { data: categories, isLoading: loadingCategory } = useQuery(
    ["get-categories"],
    getCategory
  );

  return (
    <>
      {loadingCategory || loadingPost ? (
        <Loader />
      ) : (
        <div style={style}>
          <SideBar categories={categories} />
          <Main posts={posts} />
        </div>
      )}
    </>
  );
};

export default HomePage;

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../features/blogSlice";
import { BlogPost } from "./";

const BlogList = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs.blogs);
  const status = useSelector((state) => state.blogs.status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchBlogs());
    }
  }, [dispatch, status]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error loading blogs.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      {blogs.length > 0 ? (
        blogs.map((blog) => <BlogPost key={blog.id} blog={blog} />)
      ) : (
        <div>No blogs available.</div>
      )}
    </div>
  );
};

export default BlogList;

/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteBlog } from "../features/blogSlice";

const BlogPost = ({ blog }) => {
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteBlog(id));
  };

  return (
    <div className="border p-4 mb-4">
      <h2 className="text-2xl">{blog.title}</h2>
      <p>{blog.description}</p>
      <Link to={`/blog/${blog.id}`} className="text-blue-500">
        Read more
      </Link>
      <div className="flex justify-end">
        <button
          onClick={() => handleDelete(blog.id)}
          className="border border-red-800 text-red-600 rounded-md px-3 mx-4 "
        >
          Delete
        </button>
        <Link to={`/edit/${blog.id}`}>
          <button className="border border-blue-500 text-blue-600  rounded-md px-3 ">
            Edit
          </button>
        </Link>
      </div>
    </div>
  );
};

export default BlogPost;

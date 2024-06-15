/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBlog, updateBlog } from "../features/blogSlice";
import { useNavigate, useParams } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { v4 as uuidv4 } from 'uuid';

const BlogForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const existingBlog = useSelector((state) =>
    state.blogs.blogs.find((blog) => blog.id === id)
  );

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState("");

  useEffect(() => {
    if (existingBlog) {
      setTitle(existingBlog.title);
      setDescription(existingBlog.description);
      setCoverImage(existingBlog.coverImage);
    }
  }, [existingBlog]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const blog = {
      id: id || uuidv4(),
      title,
      description,
      coverImage,
      userId: auth.currentUser.uid,
    };
    if (id) {
      dispatch(updateBlog(blog));
    } else {
      dispatch(addBlog(blog));
    }
    navigate("/");
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl mb-4">{id ? "Edit Blog" : "Create Blog"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Cover Image URL</label>
          <input
            type="text"
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {id ? "Update Blog" : "Create Blog"}
        </button>
      </form>
    </div>
  );
};

export default BlogForm;

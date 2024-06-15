import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const BlogPage = () => {
  const { id } = useParams();
  const blog = useSelector((state) =>
    state.blogs.blogs.find((blog) => blog.id === id)
  );

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl">{blog.title}</h1>
      <p>{blog.description}</p>
      {blog.coverImage && <img src={blog.coverImage} alt={blog.title} />}
    </div>
  );
};

export default BlogPage;

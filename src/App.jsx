import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  BlogForm,
  BlogPage,
  Home,
  Login,
  Navbar,
  PrivateRoute,
  SignUp,
} from "./components";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { auth } from "./firebase/firebase";
import { fetchBlogs } from "./features/blogSlice";

const App = () => {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        dispatch(fetchBlogs());
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <Router>
      <Navbar user={user} />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute user={user}>
              <Home />
            </PrivateRoute>
          }
        />
        <Route path="/blog/:id" element={<BlogPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/new-blog"
          element={
            <PrivateRoute user={user}>
              <BlogForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <PrivateRoute user={user}>
              <BlogForm />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;

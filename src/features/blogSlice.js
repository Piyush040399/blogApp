import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../firebase/firebase";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";

export const fetchBlogs = createAsyncThunk("blogs/fetchBlogs", async () => {
  const querySnapshot = await getDocs(collection(db, "blogs"));
  const blogs = [];
  querySnapshot.forEach((doc) => {
    blogs.push({ id: doc.id, ...doc.data() });
  });
  return blogs;
});

export const addBlog = createAsyncThunk("blogs/addBlog", async (blog) => {
  const docRef = await addDoc(collection(db, "blogs"), blog);
  return { id: docRef.id, ...blog };
});


export const updateBlog = createAsyncThunk("blogs/updateBlog", async (blog) => {
  console.log("object", blog);
  const blogRef = doc(db, "blogs", blog.id);
  await updateDoc(blogRef, blog);
  return blog;
});

export const deleteBlog = createAsyncThunk("blogs/deleteBlog", async (id) => {
  const docRef = doc(db, "blogs", id);
  await deleteDoc(docRef);
  return id;
});

const blogSlice = createSlice({
  name: "blogs",
  initialState: {
    blogs: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.blogs = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addBlog.fulfilled, (state, action) => {
        state.blogs.push(action.payload);
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        const updatedBlog = action.payload;
        console.log("state", updatedBlog)

        const index = state.blogs.findIndex((blog) => blog.id === updatedBlog.id);
        console.log("---->", index)
        if (index !== -1) {
          state.blogs[index] = updatedBlog;
        }
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.blogs = state.blogs.filter((blog) => blog.id !== action.payload);
      });
  },
});

export default blogSlice.reducer;

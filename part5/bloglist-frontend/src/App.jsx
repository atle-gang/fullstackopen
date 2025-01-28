import { useState, useEffect } from "react";
import blogService from "./services/blogs";
import loginService from "./services/login";
import { Notification } from "./components/Notification";
import { LoginForm } from "./components/LoginForm";
import { Togglable } from "./components/Togglable";
import { BlogForm } from "./components/BlogForm";
import { BlogList } from "./components/BlogList";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);
  const [loginVisible, setLoginVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          // Only fetch blogs if we have a user
          const blogs = await blogService.getAll();
          setBlogs(blogs);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchData();
  }, [user]); // Add user as a dependency

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);

      if (!user.id) {
        const decodedToken = JSON.parse(atob(user.token.split(".")[1]));
        user.id = decodedToken.id;
      }

      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? "none" : "" };
    const showWhenVisible = { display: loginVisible ? "" : "none" };

    return (
      <>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>login</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </>
    );
  };

  const blogForm = () => {
    return (
      <div>
        {blogList()}
        <Togglable buttonLabel="new blog">
          <BlogForm
            title={title}
            author={author}
            url={url}
            handleTitleChange={({ target }) => setTitle(target.value)}
            handleAuthorChange={({ target }) => setAuthor(target.value)}
            handleUrlChange={({ target }) => setUrl(target.value)}
            handleSubmit={handleBlogSubmit}
          />
        </Togglable>
      </div>
    );
  };

  const blogList = () => {
    return (
      <>
        <h2>Blogs</h2>
        <p>
          {user.name} logged in <button onClick={handleLogout}>log out</button>
        </p>
        {/* {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))} */}
        <BlogList blogs={blogs} saveLikeFunction={saveLike} deleteFunction={deleteBlog} user={user} />
      </>
    );
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      // Decode the token to get the user ID
      const decodedToken = JSON.parse(atob(user.token.split(".")[1]));

      // Create a user object with the ID included
      const userWithId = {
        ...user,
        id: decodedToken.id, // Add the ID from the token
      };

      window.localStorage.setItem("loggedBlogUser", JSON.stringify(userWithId));

      blogService.setToken(user.token);
      setUser(userWithId);
      setUsername("");
      setPassword("");
      setNotification({
        type: "addNotification",
        message: `You have successfully logged in`,
      });
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    } catch (exception) {
      setNotification({
        type: "errorNotification",
        message: `Wrong username or password`,
      });
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    }
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem("loggedBlogUser");
  };

  const handleBlogSubmit = async (event) => {
    event.preventDefault();

    try {
      const newBlog = {
        title,
        author,
        url,
      };

      const createdBlog = await blogService.create(newBlog);
      setBlogs(blogs.concat(createdBlog));
      setTitle("");
      setAuthor("");
      setUrl("");
      setNotification({
        type: "addNotification",
        message: `${title} by ${author} has been added`,
      });
      // Refresh the full blog list after creating a new blog
      const updatedBlogs = await blogService.getAll();
      setBlogs(updatedBlogs);

      setTimeout(() => {
        setNotification(null);
      }, 3000);
    } catch (error) {
      setNotification({
        type: "errorNotification",
        message: `${error.response.data.error}`,
      });
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    }
  };

  const saveLike = async (likedBlog) => {
    await blogService.update(likedBlog.id, likedBlog);
    blogService
      .getAll()
      .then((blogs) => {
        setBlogs(blogs);
      })
      .then(() => {
        setNotification({
          type: "addNotification",
          message: `You liked ${likedBlog.title}`,
        });
        setTimeout(() => {
          setNotification(null);
        }, 3000);
      });
  };

  const deleteBlog = async (id, blogTitle) => {
    const confirmBlogDeletion = window.confirm(
      `Delete ${blogTitle} from your saved blogs?`
    );

    if (!confirmBlogDeletion) {
      return;
    }

    try {
      await blogService.deleteEntry(id);
      setBlogs((previousBlogEntries) =>
        previousBlogEntries.filter((blog) => blog.id !== id)
      );
      setNotification({
        type: "deleteNotification",
        message: `Deleted ${blogTitle} from your blogs.`,
      });
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    } catch (error) {
      console.error("Failed to delete blog:", error);
      setNotification({
        type: "errorNotification",
        message: `Error deleting '${blogTitle}': ${error.message}`,
      });
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    }
  };

  return (
    <div>
      <Notification notification={notification} />

      {user === null ? loginForm() : blogForm()}
    </div>
  );
};

export default App;

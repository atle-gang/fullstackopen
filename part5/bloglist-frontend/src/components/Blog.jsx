import { useState } from "react";
import { BlogDetails } from "./BlogDetails";

const Blog = ({ blog, saveLikeFunction, deleteFunction }) => {
  const [isActive, setIsActive] = useState(false);
  const [likes, setLikes] = useState(blog.likes);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const buttonLabel = isActive ? "hide" : "view";

  const handleLikeClick = async () => {
    const updatedBlog = {
      ...blog,
      likes: likes + 1,
      user: blog.user.id,
    };

    try {
      await saveLikeFunction(updatedBlog);
      setLikes(likes + 1);
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  return (
    <div style={blogStyle} className="blog">
      <div>
        {blog.title}{" "}
        <button className="view-button" onClick={() => setIsActive(!isActive)}>{buttonLabel}</button>
      </div>
      {/* In React, this behavior allows you to conditionally render elements based on the truthiness of an expression. 
      If the expression before && is true, React will evaluate and render the part after &&. If it's false, React will skip rendering entirely. */}
      {isActive && (
        <BlogDetails
          blog={blog}
          likes={likes}
          handleLike={handleLikeClick}
          handleDeletion={deleteFunction}
        />
      )}
    </div>
  );
};

export { Blog };

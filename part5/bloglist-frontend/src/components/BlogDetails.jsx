import React from "react";

const BlogDetails = ({ blog, likes, handleLike, handleDeletion }) => {
  return (
    <div>
      <p>{blog.url}</p>
      <p>
        likes {likes} <button onClick={handleLike}>like</button>
      </p>
      <p>{blog.author}</p>
      <button onClick={handleDeletion}>remove</button>
    </div>
  );
};

export { BlogDetails };

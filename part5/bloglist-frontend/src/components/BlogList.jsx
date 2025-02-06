import React from "react";
import { Blog } from "./Blog";

const BlogList = ({ blogs, saveLikeFunction, deleteFunction, user }) => {
  // Filter blogs to only show those belonging to the current user
  if (!user || !user.id) {
    return null;
  }

  const userBlogs = blogs.filter((blog) => {
    // Check if the blog's user array contains an object with matching ID
    return blog.user.some((blogUser) => blogUser.id === user.id);
  });

  const mappingFunction = (blog) => {
    return (
      <Blog
        data-testid="blogs"
        key={blog.id}
        blog={blog}
        saveLikeFunction={saveLikeFunction}
        deleteFunction={() => deleteFunction(blog.id, blog.title)}
      />
    );
  };

  const compareFun = (a, b) => {
    const likes1 = a.props.blog.likes;
    const likes2 = b.props.blog.likes;
    return likes2 - likes1;
  };

  const sortedBlogs = userBlogs.map(mappingFunction).sort(compareFun);

  return (
    <div data-test-id="blog-list">
      {sortedBlogs.length > 0 ? (
        sortedBlogs
      ) : (
        <p>No blogs found. Create your first blog!</p>
      )}
    </div>
  );
};

export { BlogList };

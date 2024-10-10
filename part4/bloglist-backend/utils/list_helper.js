const dummy = (blogs) => {
  return 1;
};

const totalLikes = (listOfBlogs) => {
  const reducer = (total, currentItem) => {
    return total + currentItem.likes;
  }

  return listOfBlogs.reduce(reducer, 0);
};

const favoriteBlog = (listOfBlogs) => {
  if (listOfBlogs.length === 0) return null;

  const maxLikes = Math.max(...listOfBlogs.map((blog) => blog.likes));
  const topFavorites = listOfBlogs.filter((blog) => blog.likes === maxLikes);

  const topFavorite = topFavorites[0];
  const { __v, _id, url, ...favoriteBlogDetails} = topFavorite;
  return favoriteBlogDetails;

}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
};
const dummy = (blogs) => {
  return 1;
};

const totalLikes = (listOfBlogs) => {
  const reducer = (total, currentItem) => {
    return total + currentItem.likes;
  }

  return listOfBlogs.reduce(reducer, 0);
};

module.exports = {
  dummy,
  totalLikes
};
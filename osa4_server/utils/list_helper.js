
const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0;
  }
  const blogCounter = blogs.reduce((sum, blog) => sum + blog.likes, 0);
  return blogCounter / blogs.length;
};

const favoriteBlog = (blogs) => {
  bestBlog = blogs[0]
  const mostLikes = blogs.map((item) => {
    if (item.likes > bestBlog.likes) {
      bestBlog = item
    }
  });
  // Lisätään eniten tykkäyksiä saanut blogi tyhjään objectiin ja palautetaan se
  winnerBlog = {}
  winnerBlog["title"] = bestBlog.title
  winnerBlog["author"] = bestBlog.author
  winnerBlog["likes"] = bestBlog.likes
  return winnerBlog;
};


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};

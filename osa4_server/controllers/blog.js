const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user")
const jwt = require('jsonwebtoken')



//ROUTET GET
blogRouter.get("/blogs", async (request, response) => {
  const blog_post = await Blog
  .find({}).populate("user", {username: 1, name: 1});
  
  response.json(blog_post);
});

// blogRouter.get("/blogs", async (request, response) => {
//   const blog_post = await Blog.find({});
//   response.json(blog_post);
// });


blogRouter.get("/blogs/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});
// Apufunktio getTokenFrom eristää tokenin headerista authorization
const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}
// POST
blogRouter.post("/blogs", async (request, response) => {
  const body = request.body;
  console.log(request.body)
  // Tokenin oikeellisuus varmistetaan metodilla jwt.verify
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const user = await User.findById(decodedToken.id)

  if (!body.likes) {
    body.likes = 0;
  }
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  console.log("Note Saved");
  response.json(savedBlog)
});

// DELETE
blogRouter.delete("/blogs/:id", async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

module.exports = blogRouter;

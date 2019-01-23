const Koa = require("koa");
const app = new Koa();

// Logger middleware
const responseTimer = async (ctx, next) => {
  const { method, path } = ctx.request;
  const start = Date.now();
  await next();
  const timeTaken = (Date.now() - start) / 1000;
  console.log(`${method} request to ${path} took ${timeTaken}s`);
};

app.use(responseTimer);

// Response
app.use(async ctx => {
  ctx.body = "Hello World";
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

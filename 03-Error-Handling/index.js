const Koa = require("koa");
const app = new Koa();

// Define generic error handler
const errorHandler = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.expose ? err.message : "An error occurred!";
    app.emit("error", err, ctx);
  }
};

// register generic error handler
app.use(errorHandler);

// Define json request error handler middleware
const jsonErrorHandler = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    const isJson = ctx.get("Accept") === "application/json";
    if (isJson) {
      ctx.body = {
        error: "An error just occured"
      };
    } else {
      throw err;
    }
  }
};

// register json error handler middleware
app.use(jsonErrorHandler);

// Throw error in response middleware
app.use(async ctx => {
  throw new Error("An error occurred");
  ctx.body = "Hello, world";
});

app.listen(3000, () => {
  console.log("App started on port 3000");
});

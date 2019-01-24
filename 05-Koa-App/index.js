const Koa = require("koa");
const views = require("koa-views");
const session = require("koa-session");
const bodyParser = require("koa-body");

const initDb = require("./db");
const router = require("./middleware/router");
const methodOverride = require("./middleware/method-override");

// initialize database
initDb();

// create app instance
const app = new Koa();
app.keys = ["secret key"];

// view renderer
app.use(
  views(`${__dirname}/views`, {
    extension: "ejs"
  })
);

// body parser middleware
app.use(bodyParser());

// session middleware
app.use(session(app));

// method override middleware
app.use(methodOverride());

// router
app.use(router.routes());

// start server
const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);

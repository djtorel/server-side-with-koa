const Koa = require("koa");
const router = require("./middleware/router");
const logger = require("koa-logger");
const bodyParser = require("koa-body");
const validator = require("./middleware/validator");
const mongoose = require("mongoose");

// Initialize App
const app = new Koa();

// Initialize and connect to MongoDB
mongoose.connect("mongodb://localhost:27017/koa-contact", {
  useNewUrlParser: true
});

// Listen for successful connection or error
const db = mongoose.connection;
db.on("error", error => {
  throw new Error(`error connecting to db: ${error}`);
});
db.once("open", () => console.log("database connected"));

// Utility Middleware
app.use(logger());
app.use(bodyParser());
app.use(validator());

// Router middleware
app.use(router.routes());
app.use(router.allowedMethods());

// Start App
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

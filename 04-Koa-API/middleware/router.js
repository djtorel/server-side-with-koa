const KoaRouter = require("koa-router");
const contactController = require("../controllers/ContactController");

// Initialize router
const router = new KoaRouter();

router
  .get("/", async ctx => (ctx.body = "Welcome to the cotacts API!"))
  .get("/contact", contactController.index)
  .post("/contact", contactController.store)
  .get("/contact/:id", contactController.show)
  .put("/contact/:id", contactController.update)
  .delete("/contact/:id", contactController.destroy);

module.exports = router;

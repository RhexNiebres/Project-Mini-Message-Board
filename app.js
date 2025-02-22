const express = require("express");
const app = express();
const path = require("node:path");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const links = [
  { href: "/", text: "messages" },
  { href: "new", text: "post a new message" },
];

app.get("/", (req, res) => {
    res.render("index", { links: links});
  });
  app.get("new", (req, res) => {
    res.render("new", { links: links });
  });
  
const port = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}!`);
});

app.use((req, res, next) => {
  throw new Error("OH NO! this page does not exist");
  // or next(new Error("OH NO!"));
});

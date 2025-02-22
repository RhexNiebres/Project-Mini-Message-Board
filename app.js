const express = require("express");
const app = express();
const path = require("node:path");
require("dotenv").config();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

const links = [
  { href: "/", text: "messages" },
  { href: "/new", text: "post a new message" },
];

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];

app.get("/", (req, res) => {
  res.render("index", { links: links, messages: messages });
});
app.get("/new", (req, res) => {
  res.render("form", { links: links });
});

app.post("/new", (req, res) => {
    const { messageText, messageUser } = req.body; // remember to match input name attributes
  
    if (!messageText || !messageUser) {
      return res.render("form", { links, error: "All fields are required!" });
    }
  
    messages.push({ text: messageText, user: messageUser, added: new Date() });
    res.redirect("/");
  });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}!`);
});

app.use((req, res, next) => {
  throw new Error("OH NO! this page does not exist");
  // or next(new Error("OH NO!"));
});

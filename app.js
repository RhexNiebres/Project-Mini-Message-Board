const express = require("express");
const app = express();
const path = require("node:path");
require("dotenv").config();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const links = [
  { href: "/", text: "messages" },
  { href: "/new", text: "post a new message" },
];

const messages = [
  {
    text: "Wakey wakey!",
    user: "Sung Jin-woo",
    added: new Date(),
  },
  {
    text: "The World!",
    user: "Dio Brando",
    added: new Date(),
  },
];

app.get("/", (req, res) => {
  const sortedMessages = messages.sort((a, b) => b.added - a.added); //sort messages from recent to old messages
  res.render("index", { links: links, messages: sortedMessages });
});

app.get("/new", (req, res) => {
  res.render("form", { links: links });
});

app.post("/new", (req, res) => {
  const { messageText, messageUser } = req.body; // remember to match input name attributes!!
  messages.push({ text: messageText, user: messageUser, added: new Date() });
  return res.redirect("/");
});

app.get("/message-details/:id", (req, res) => {
  const messageId = parseInt(req.params.id, 10);
  const message = messages[messageId];

  if (!message) {
    return res.status(404).send("Message not found");
  }
  res.render("messageDetails", { links: links, message: message });
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`listening on port ${port}!`);
});

app.use((req, res) => {
  res.status(404).render("CustomError", { message: "Page not found!" });
});
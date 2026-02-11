const express = require("express");
const mongoose = require("mongoose");
const Note = require("./models/Note");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
app.use(express.json());
app.use(express.static("public"));

console.log("MONGO_URL:", process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// Save note for a user
app.post("/note/save", async (req, res) => {
  const { userId, content, visible } = req.body;

  let note = await Note.findOne({ userId });

  if (!note) {
    note = new Note({ userId, content, visible });
  } else {
    note.content = content;
    note.visible = visible;
  }

  note.lastUpdated = new Date().toLocaleString();
  await note.save();

  res.json(note);
});

// Get note for a user
app.get("/note/:userId", async (req, res) => {
  const note = await Note.findOne({ userId: req.params.userId });
  res.json(note || {});
});

app.get("/test", (req, res) => {
  res.send("Server OK");
});

const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("note-change", (data) => {
    socket.broadcast.emit("note-update", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

/* server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
}); */

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});


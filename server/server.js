const express = require("express");
const mongoose = require("mongoose");
const Note = require("./models/Note");

const app = express();
app.use(express.json());
app.use(express.static("public"));

mongoose.connect("mongodb+srv://meghauk04_db_user:56RfGRG1GCgupHH9@mongodbcluster.43fp0ji.mongodb.net/?appName=Mongodbcluster")
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

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

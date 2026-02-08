const params = new URLSearchParams(window.location.search);
const userId = params.get("u");
const socket = io();

const note = document.getElementById("note");
const saveBtn = document.getElementById("saveBtn");
const lastUpdated = document.getElementById("lastUpdated");
const visibility = document.getElementById("visibility");
const userTitle = document.getElementById("userTitle");
const darkToggle = document.getElementById("darkToggle");
const exportBtn = document.getElementById("exportBtn");

if (userTitle) {
  userTitle.textContent = "Notepad for " + userId;
}

note.addEventListener("input", async () => {
  if (visibility.checked) {
    const data = {
      userId,
      content: note.value,
      visible: true
    };

    // realtime
    socket.emit("note-change", data);

    // auto-save to DB
    await fetch("/note/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
  }
});

socket.on("note-update", (data) => {
  if (data.userId !== userId) {
    note.value = data.content;
  }
});

async function loadNote() {
  if (!userId) return;
  const res = await fetch(`/note/${userId}`);
  const data = await res.json();

  note.value = data.content || "";
  visibility.checked = data.visible || false;
  lastUpdated.textContent = data.lastUpdated
    ? "Last updated: " + data.lastUpdated
    : "Last updated: never";
}

if (saveBtn) {
  saveBtn.addEventListener("click", async () => {
    const res = await fetch("/note/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        content: note.value,
        visible: visibility.checked
      })
    });

    const data = await res.json();
    lastUpdated.textContent = "Last updated: " + data.lastUpdated;
  });
}

/* DARK MODE */
darkToggle?.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");
});

/* EXPORT PDF */
exportBtn?.addEventListener("click", () => {
  const win = window.open("", "", "width=800,height=600");
  win.document.write(`<pre>${note.value}</pre>`);
  win.print();
});

/* LOAD */
window.onload = loadNote;

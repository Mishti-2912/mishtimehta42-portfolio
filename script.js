// Edit this list with your own projects.
const projects = [
  { name: "Smart Attendance System", tag: "Semester 5 project",
    text: "A web app for marking and reporting class attendance, with teacher and student logins and monthly percentage reports.",
    stack: "HTML, CSS, JavaScript, Node.js, MySQL", live: "#", code: "https://github.com/your-username/attendance" },
  { name: "Campus Notes Hub", tag: "Hackathon finalist",
    text: "A platform where students upload and search semester notes by subject, built in 24 hours with a team of four.",
    stack: "React, Firebase", live: "#", code: "https://github.com/your-username/notes-hub" },
  { name: "Library Manager", tag: "DBMS course project",
    text: "A desktop program for issuing and returning books, tracking fines and searching the catalogue.",
    stack: "Java, MySQL", live: "#", code: "https://github.com/your-username/library" },
  { name: "Sorting Visualizer", tag: "Personal project",
    text: "An interactive page that animates bubble, merge and quick sort so each algorithm's steps are easy to follow.",
    stack: "HTML, CSS, JavaScript", live: "#", code: "https://github.com/your-username/sorting" }
];

const $ = (s, r = document) => r.querySelector(s);

projects.forEach((p, i) => {
  const li = document.createElement("li");
  li.innerHTML = `
    <button class="row" type="button" aria-expanded="false" aria-controls="p${i}">
      <span class="name"></span><span class="tag"></span>
    </button>
    <div class="more" id="p${i}"><div>
      <p class="desc"></p><p class="stack"></p>
      <div class="links"><a href="${p.live}">View site</a><a href="${p.code}">View code</a></div>
    </div></div>`;
  $(".name", li).textContent = p.name;
  $(".tag", li).textContent = p.tag;
  $(".desc", li).textContent = p.text;
  $(".stack", li).textContent = "Built with " + p.stack;
  const btn = $(".row", li);
  btn.addEventListener("click", () => {
    btn.setAttribute("aria-expanded", li.classList.toggle("open"));
  });
  $("#plist").append(li);
});

// Photo: shows photo.jpg; falls back to initials if the file is missing.
const photo = $("#photo"), img = $("img", photo);
const showFallback = () => photo.classList.add("empty");
img.addEventListener("error", showFallback);
if (img.complete && img.naturalWidth === 0) showFallback();

// Theme
const root = document.documentElement, tbtn = $("#theme");
let saved = null;
try { saved = localStorage.getItem("theme"); } catch (e) {}
function setTheme(t) {
  root.dataset.theme = t;
  tbtn.textContent = t === "dark" ? "Light" : "Dark";
  try { localStorage.setItem("theme", t); } catch (e) {}
}
setTheme(saved || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));
tbtn.addEventListener("click", () => setTheme(root.dataset.theme === "dark" ? "light" : "dark"));

$("#year").textContent = new Date().getFullYear();

// Contact form opens the visitor's email app.
const EMAIL = "you@example.com"; // change to your address
$("#form").addEventListener("submit", e => {
  e.preventDefault();
  const f = e.target, note = $("#note");
  let ok = true;
  ["name", "email", "msg"].forEach(n => {
    const el = f.elements[n];
    const bad = !el.value.trim() || (n === "email" && !/^\S+@\S+\.\S+$/.test(el.value));
    el.setAttribute("aria-invalid", bad);
    if (bad) ok = false;
  });
  if (!ok) { note.textContent = "Fill in every field with a valid email address."; return; }
  const body = `${f.msg.value}\n\n${f.name.value} (${f.email.value})`;
  location.href = `mailto:${EMAIL}?subject=${encodeURIComponent("Portfolio message from " + f.name.value)}&body=${encodeURIComponent(body)}`;
  note.textContent = "Opening your email app.";
});

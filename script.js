const $ = (s, r = document) => r.querySelector(s);

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

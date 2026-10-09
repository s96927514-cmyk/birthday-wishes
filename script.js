// =============================
// PERSONALIZE THESE 2 VALUES
// =============================
const birthdayName = "Bandariya";
document.getElementById("birthdayName").textContent = birthdayName;

// Smooth section navigation
document.querySelectorAll(".next-btn").forEach(button => {
  button.addEventListener("click", () => {
    const id = button.dataset.next;
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: "smooth" });
  });
});

// Floating hearts
const hearts = document.querySelector(".hearts");

function createHeart() {
  const heart = document.createElement("span");
  heart.className = "floating-heart";
  heart.textContent = Math.random() > .5 ? "♥" : "♡";
  heart.style.left = Math.random() * 100 + "%";
  heart.style.fontSize = (12 + Math.random() * 20) + "px";
  heart.style.animationDuration = (5 + Math.random() * 5) + "s";
  hearts.appendChild(heart);
  setTimeout(() => heart.remove(), 10000);
}
setInterval(createHeart, 650);

// Balloon game
const balloons = document.querySelectorAll(".balloon");
const balloonMessage = document.getElementById("balloonMessage");
const balloonHint = document.getElementById("balloonHint");
const balloonNext = document.getElementById("balloonNext");
let popped = 0;

balloons.forEach(balloon => {
  balloon.addEventListener("click", () => {
    if (balloon.classList.contains("popped")) return;

    balloon.classList.add("popped");
    popped++;

    balloonMessage.textContent = balloon.dataset.message;

    if (popped === balloons.length) {
      balloonHint.textContent = "All balloons popped! You unlocked the next surprise ❤️";
      balloonNext.classList.remove("hidden");
      showToast("You popped them all! 🎉");
      confetti();
    }
  });
});

// Wish
const wishBtn = document.getElementById("wishBtn");
const wishText = document.getElementById("wishText");
const wishNext = document.getElementById("wishNext");

wishBtn.addEventListener("click", () => {
  wishText.textContent = "✨ Wish made! May this year be your most beautiful one yet. ✨";
  wishBtn.textContent = "WISH GRANTED ❤️";
  wishBtn.disabled = true;
  wishNext.classList.remove("hidden");
  confetti();
});

// Memory slider
const photos = [
  { src: encodeURI("pic/312859505387930279.jpg"), label: "Our happy moments" },
  { src: encodeURI("pic/3588874698469855.jpg"), label: "A smile worth keeping" },
  { src: encodeURI("pic/Grace in Classic Black and Delicate Embroidery.jpg"), label: "Elegant and beautiful" },
  { src: encodeURI("pic/Little Monkey with a Mirror in a Pink Dress.jpg"), label: "Little monkey vibes" },
  { src: encodeURI("pic/mi versíon en anime 🎀🪄🌸.jpg"), label: "Made with love" }
];

let currentPhoto = 0;
const photoEmoji = document.getElementById("photoEmoji");
const photoLabel = document.getElementById("photoLabel");
const dots = document.getElementById("dots");

photos.forEach((photo, index) => {
  const dot = document.createElement("span");
  dot.className = "dot";
  dot.addEventListener("click", () => {
    currentPhoto = index;
    updatePhoto();
  });
  dots.appendChild(dot);
});

function updatePhoto() {
  const photo = photos[currentPhoto];
  const photoBox = document.getElementById("photoBox");
  photoBox.innerHTML = `<img src="${photo.src}" alt="${photo.label}"><small>${photo.label}</small>`;
  photoLabel.textContent = photo.label;
  photoEmoji.style.display = "none";

  document.querySelectorAll(".dot").forEach((dot, i) => {
    dot.classList.toggle("active", i === currentPhoto);
  });
}

document.getElementById("nextPhoto").addEventListener("click", () => {
  currentPhoto = (currentPhoto + 1) % photos.length;
  updatePhoto();
});

document.getElementById("prevPhoto").addEventListener("click", () => {
  currentPhoto = (currentPhoto - 1 + photos.length) % photos.length;
  updatePhoto();
});

updatePhoto();

// Restart
document.getElementById("restart").addEventListener("click", () => {
  balloons.forEach(b => b.classList.remove("popped"));
  popped = 0;
  balloonMessage.textContent = "";
  balloonHint.textContent = "Click a balloon and pop it";
  balloonNext.classList.add("hidden");

  wishText.textContent = "May all your beautiful wishes come true.";
  wishBtn.textContent = "MAKE MY WISH ✨";
  wishBtn.disabled = false;
  wishNext.classList.add("hidden");

  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Small toast
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2500);
}

// Simple celebration effect
function confetti() {
  for (let i = 0; i < 35; i++) {
    setTimeout(() => {
      const heart = document.createElement("span");
      heart.className = "floating-heart";
      heart.textContent = ["♥", "✨", "💗", "🎉"][Math.floor(Math.random() * 4)];
      heart.style.left = (20 + Math.random() * 60) + "%";
      heart.style.bottom = "25%";
      heart.style.fontSize = (14 + Math.random() * 18) + "px";
      heart.style.animationDuration = (2 + Math.random() * 2) + "s";
      hearts.appendChild(heart);
      setTimeout(() => heart.remove(), 4500);
    }, i * 40);
  }
}

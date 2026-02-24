const images = [
  "cat1.jpg",
  "cat2.jpg",
  "cat3.jpg",
  "cat4.jpg",
  "cat5.jpg",
  "cat6.jpg",
  "cat7.jpg",
  "cat8.jpg",
  "cat9.jpg",
  "cat10.jpg"
];

let shuffled = [];
let currentIndex = 0;

function shuffleArray(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

function showImage(index) {
  const img = document.getElementById("affirmationImage");
  img.style.opacity = 0;

  setTimeout(() => {
    img.src = shuffled[index];
    img.style.opacity = 1;
  }, 150);
}

function nextImage() {
  currentIndex++;
  if (currentIndex >= shuffled.length) {
    shuffled = shuffleArray([...images]);
    currentIndex = 0;
  }
  showImage(currentIndex);
}

function prevImage() {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = shuffled.length - 1;
  }
  showImage(currentIndex);
}

window.onload = function () {
  shuffled = shuffleArray([...images]);
  showImage(currentIndex);
};
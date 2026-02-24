const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const startBtn = document.getElementById("startCamera");
const captureBtn = document.getElementById("capture");
const uploadBtn = document.getElementById("uploadBtn");
const uploadInput = document.getElementById("uploadInput");
const downloadBtn = document.getElementById("download");


/* 🎥 Start Camera */
startBtn.addEventListener("click", async () => {
  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  video.srcObject = stream;

  video.onloadedmetadata = () => {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
  };

  video.style.display = "block";
  canvas.style.display = "none";
});
/* 📸 Capture Photo (CROPPED, NO STRETCHING) */
captureBtn.addEventListener("click", () => {
  ctx.drawImage(video, 0, 0);

  video.style.display = "none";
  canvas.style.display = "block";
});

/* 📤 Upload Image */
uploadBtn.addEventListener("click", () => {
  uploadInput.click();
});

uploadInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = function(event) {
    const img = new Image();
    img.onload = function() {

      const imgRatio = img.width / img.height;
      const canvasRatio = canvas.width / canvas.height;

      let sx, sy, sWidth, sHeight;

      if (imgRatio > canvasRatio) {
        sHeight = img.height;
        sWidth = img.height * canvasRatio;
        sx = (img.width - sWidth) / 2;
        sy = 0;
      } else {
        sWidth = img.width;
        sHeight = img.width / canvasRatio;
        sx = 0;
        sy = (img.height - sHeight) / 2;
      }

      ctx.drawImage(
        img,
        sx, sy, sWidth, sHeight,
        0, 0, canvas.width, canvas.height
      );

      video.style.display = "none";
      canvas.style.display = "block";
    };

    img.src = event.target.result;
  };

  reader.readAsDataURL(file);
});

/* 💾 Download */
downloadBtn.addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "wizard-photo.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
});
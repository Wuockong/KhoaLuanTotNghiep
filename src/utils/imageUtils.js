import jsQR from "jsqr";

// Chuyển video frame thành QR code
export const decodeQRCodeFromVideo = (video, canvas) => {
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  return jsQR(imageData.data, canvas.width, canvas.height);
};

// Đọc QR từ ảnh được upload
export const readQRCodeFromImage = (file, onDecode) => {
  const img = new Image();
  const reader = new FileReader();

  reader.onload = () => {
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        if (blob) onDecode(blob);
      }, "image/png");
    };
    img.src = reader.result;
  };
  reader.readAsDataURL(file);
};

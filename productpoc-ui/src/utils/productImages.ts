import camera from "../assets/products/camera.jpg";
import laptop from "../assets/products/laptop.jpg";
import headset from "../assets/products/headset.jpg";
import mobile from "../assets/products/mobile.jpg";
import tv from "../assets/products/tv.jpg";
import defaultImg from "../assets/products/default.jpg";

export const getProductImage = (name: string): string => {
  const key = name.toLowerCase();

  if (key.includes("camera")) return camera;
  if (key.includes("laptop")) return laptop;
  if (key.includes("headset")) return headset;
  if (key.includes("mobile")) return mobile;
  if (key.includes("tv")) return tv;

  return defaultImg;
};

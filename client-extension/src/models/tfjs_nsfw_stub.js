import * as tf from "@tensorflow/tfjs";

/** Stubbed model: replace with converted EfficientNet-lite NSFW model later */
export async function runTfjsNsfwModel(imgEl) {
  const w = imgEl.width || 200;
  const h = imgEl.height || 200;
  await tf.nextFrame();
  // demo score
  return Math.min(0.99, Math.abs(Math.sin((w * h) % 1000)));
}

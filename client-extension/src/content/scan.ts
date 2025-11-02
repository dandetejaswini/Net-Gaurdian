import { runTfjsNsfwModel } from "../models/tfjs_nsfw_stub";
import { getSetting } from "../utils/storage";

const MEDIA_SELECTOR = "img, video, [role='img']";
const IFRAME_SELECTOR = "iframe";

function blurElement(el: HTMLElement, reason: string, score: number, role: string) {
  if (el.dataset.netguardianBlurred) return;

  el.dataset.netguardianBlurred = "true";
  el.style.filter = "blur(18px)";
  el.style.transition = "filter 0.2s ease";
  if (role === "child") el.style.pointerEvents = "none";

  const overlay = document.createElement("div");
  overlay.textContent = `${reason}${score ? " " + (score * 100).toFixed(0) + "%" : ""}`;
  Object.assign(overlay.style, {
    position: "absolute",
    top: "5px",
    left: "5px",
    background: "rgba(0,0,0,0.7)",
    color: "#fff",
    fontSize: "12px",
    padding: "2px 6px",
    zIndex: "9999999",
    borderRadius: "4px"
  });

  const parent = el.parentElement;
  if (parent) {
    parent.style.position = "relative";
    parent.appendChild(overlay);
  }
}

function replaceWithBlockedMessage(el: HTMLElement, message: string) {
  const blockedDiv = document.createElement("div");
  blockedDiv.textContent = message;
  Object.assign(blockedDiv.style, {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
    color: "#fff",
    width: el.clientWidth + "px",
    height: el.clientHeight + "px",
    fontSize: "14px",
    textAlign: "center",
    borderRadius: "6px",
    zIndex: "999999"
  });

  el.replaceWith(blockedDiv);
}

async function scanMedia(el: HTMLImageElement | HTMLVideoElement, role: string) {
  try {
    if (el instanceof HTMLImageElement && el.src) {
      const score = await runTfjsNsfwModel(el);
      const threshold = role === "child" ? 0.4 : 0.85;

      if (score > threshold) {
        blurElement(el, "Blocked: NSFW", score, role);
        if (role === "child") {
          el.src = "";
          el.removeAttribute("srcset");
        }
      }
    }

    if (el instanceof HTMLVideoElement) {
      if (role === "child") {
        try {
          el.pause();
        } catch {}
        el.removeAttribute("src");
        el.srcObject = null;
        el.load();
        replaceWithBlockedMessage(el, "Video blocked: NSFW or adult content");
      } else {
        blurElement(el, "Blurred: Sensitive Video", 0.9, role);
      }
    }
  } catch (err) {
    console.error("[NetGuardian] Error scanning media:", err);
  }
}

async function scanIframe(iframe: HTMLIFrameElement, role: string) {
  const src = iframe.src || "";
  const riskyPatterns = ["porn", "nsfw", "xxx", "adult", "sex", "hentai", "cams", "nude"];
  const isRisky = riskyPatterns.some(word => src.toLowerCase().includes(word));

  if (isRisky) {
    if (role === "child") {
      iframe.remove();
      console.warn(`[NetGuardian] Removed iframe: ${src}`);
    } else {
      blurElement(iframe, "Blurred: Sensitive iframe", 0, role);
    }
  }
}

async function rescanDynamicContent() {
  const role = (await getSetting("role")) || "adult";

  const mediaEls = document.querySelectorAll(MEDIA_SELECTOR);
  mediaEls.forEach(el => scanMedia(el as HTMLImageElement | HTMLVideoElement, role));

  const iframes = document.querySelectorAll(IFRAME_SELECTOR);
  iframes.forEach(iframe => scanIframe(iframe as HTMLIFrameElement, role));
}

function observeNewElements() {
  const observer = new MutationObserver(() => rescanDynamicContent());
  observer.observe(document.body, { childList: true, subtree: true });
}

/**
 * 🔒 Completely block video playback in child mode
 */
async function preventVideoPlaybackForChildren() {
  const role = (await getSetting("role")) || "adult";
  if (role !== "child") return;

  // Override play() globally
  const originalPlay = HTMLMediaElement.prototype.play;
  HTMLMediaElement.prototype.play = function (...args) {
    console.warn("[NetGuardian] Video playback blocked for child mode");
    this.pause();
    this.src = "";
    this.srcObject = null;
    replaceWithBlockedMessage(this as HTMLElement, "Video blocked by NetGuardian (Child Mode)");
    return Promise.reject("Blocked by NetGuardian");
  };

  // Immediately stop already playing videos
  document.querySelectorAll("video").forEach(v => {
    (v as HTMLVideoElement).pause();
    (v as HTMLVideoElement).removeAttribute("src");
    (v as HTMLVideoElement).load();
    replaceWithBlockedMessage(v as HTMLElement, "Video blocked by NetGuardian (Child Mode)");
  });
}

(async function initScanner() {
  await rescanDynamicContent();
  observeNewElements();
  await preventVideoPlaybackForChildren();

  window.addEventListener("popstate", rescanDynamicContent);
  window.addEventListener("hashchange", rescanDynamicContent);

  // Recheck every few seconds for dynamically loaded previews
  setInterval(rescanDynamicContent, 3000);
})();

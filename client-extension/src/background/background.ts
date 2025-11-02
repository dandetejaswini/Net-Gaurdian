chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ enabled: true, role: "adult" });
});

chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  if (msg.type === "toggleRole") {
    chrome.storage.local.get("role", res => {
      const newRole = res.role === "child" ? "adult" : "child";
      chrome.storage.local.set({ role: newRole }, () =>
        sendResponse({ role: newRole })
      );
    });
    return true;
  }
});

export async function getSetting<T = any>(key: string): Promise<T | undefined> {
  return new Promise(resolve =>
    chrome.storage.local.get([key], result => resolve(result[key]))
  );
}
export async function setSetting(key: string, value: any): Promise<void> {
  return new Promise(resolve =>
    chrome.storage.local.set({ [key]: value }, () => resolve())
  );
}

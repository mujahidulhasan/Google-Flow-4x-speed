const toggle = document.getElementById("toggle");
const statusText = document.getElementById("status");

chrome.storage.local.get(["enabled"], (result) => {

  const enabled = result.enabled !== false;

  toggle.checked = enabled;

  statusText.textContent = enabled
    ? "Enabled"
    : "Disabled";

});

toggle.addEventListener("change", async () => {

  const enabled = toggle.checked;

  chrome.storage.local.set({ enabled });

  statusText.textContent = enabled
    ? "Enabled"
    : "Disabled";

  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true
  });

  chrome.tabs.reload(tab.id);

});

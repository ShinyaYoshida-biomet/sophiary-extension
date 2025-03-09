// Create context menu item
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "sophiarySearch",
    title: "Search \"%s\" on Sophiary",
    contexts: ["selection"]
  });
});

// Handle menu item click
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "sophiarySearch" && info.selectionText) {
    // Get the selected text
    const selectedText = info.selectionText.trim();

    // Check if a word is actually selected
    if (selectedText) {
      // Open Sophiary in a new tab
      const url = `https://sophiary-web.com/search/en-ja/${encodeURIComponent(selectedText.toLowerCase())}`;
      chrome.tabs.create({ url });      
    }
  }
});
// コンテキストメニュー項目の作成
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "sophiarySearch",
    title: "Sophiaryで「%s」を検索",
    contexts: ["selection"]
  });
});

// メニュー項目がクリックされたときの処理
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "sophiarySearch" && info.selectionText) {
    // 選択されたテキストを取得
    const selectedText = info.selectionText.trim();

    // 単語が実際に選択されたか確認
    if (selectedText) {
      // ポップアップを表示するためのメッセージをコンテンツスクリプトに送信
      chrome.tabs.sendMessage(tab.id, {
        action: "showPopup",
        word: selectedText,
        url: `https://sophiary-web.com/search/en-ja/${encodeURIComponent(selectedText.toLowerCase())}`
      });
    }
  }
});
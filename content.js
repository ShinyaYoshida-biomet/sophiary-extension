// Receive messages from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "showPopup" && message.word && message.url) {
    // Display a popup near the click position
    createPopup(message.word, message.url);
  }
});

// Function to create and display the popup
function createPopup(word, url) {
  // Remove existing popup
  removeExistingPopup();

  // Create a new popup element
  const popup = document.createElement('div');
  popup.id = 'sophiary-popup';
  popup.style.cssText = `
    position: fixed;
    top: 20%;
    right: 20px;
    width: 320px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 999999;
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    overflow: hidden;
    max-height: 400px;
  `;

  // Display simplified OGP data (actual fetch omitted)
  // In a real application, fetch OGP data here or use pre-prepared data
  const partOfSpeech = getPartOfSpeechJapanese('noun'); // Using 'noun' as an example

  popup.innerHTML = `
    <div style="padding: 16px; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; align-items: center;">
      <h3 style="margin: 0; font-size: 18px;">${word} ${partOfSpeech ? `(${partOfSpeech})` : ''}</h3>
      <button id="sophiary-popup-close" style="background: none; border: none; cursor: pointer; font-size: 20px;">×</button>
    </div>
    <div style="padding: 16px;">
      <h4 style="margin: 0 0 8px; font-size: 16px;">${word} - Sophiary Dictionary</h4>
      <p style="margin: 0; color: #555; font-size: 14px;">Look up the meaning of "${word}" in Sophiary</p>
    </div>
    <a href="${url}" target="_blank" style="display: block; text-align: center; padding: 12px; background: #4a6cf7; color: white; text-decoration: none; font-weight: bold;">
      View details in Sophiary
    </a>
  `;

  // Add to the document
  document.body.appendChild(popup);

  // Set event listener for the close button
  document.getElementById('sophiary-popup-close').addEventListener('click', () => {
    removeExistingPopup();
  });

  // Automatically close after 10 seconds
  setTimeout(() => {
    if (document.getElementById('sophiary-popup')) {
      removeExistingPopup();
    }
  }, 10000);
}

// Remove existing popup
function removeExistingPopup() {
  const existingPopup = document.getElementById('sophiary-popup');
  if (existingPopup) {
    existingPopup.remove();
  }
}
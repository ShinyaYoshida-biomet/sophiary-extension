// Receive messages from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "showPopup" && message.word && message.url) {
    // Display the popup near the click position
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

  // Fetch and display OGP data
  fetchOgpData(url).then(ogpData => {
    // Set the content of the popup
    popup.innerHTML = `
      <div style="padding: 16px; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; align-items: center;">
        <h3 style="margin: 0; font-size: 18px;">${word}</h3>
        <button id="sophiary-popup-close" style="background: none; border: none; cursor: pointer; font-size: 20px;">×</button>
      </div>
      <div style="padding: 16px;">
        ${ogpData.image ? `<img src="${ogpData.image}" alt="${word}" style="width: 100%; border-radius: 4px; margin-bottom: 8px;">` : ''}
        <h4 style="margin: 0 0 8px; font-size: 16px;">${ogpData.title || `${word} - Sophiary Dictionary`}</h4>
        <p style="margin: 0; color: #555; font-size: 14px;">${ogpData.description || 'Click to check the meaning of the word'}</p>
      </div>
      <a href="${url}" target="_blank" style="display: block; text-align: center; padding: 12px; background: #4a6cf7; color: white; text-decoration: none; font-weight: bold;">
        View details on Sophiary
      </a>
    `;

    // Add to the document
    document.body.appendChild(popup);

    // Set event listener for the close button
    document.getElementById('sophiary-popup-close').addEventListener('click', () => {
      removeExistingPopup();
    });

    // Automatically close after 5 seconds
    setTimeout(() => {
      if (document.getElementById('sophiary-popup')) {
        removeExistingPopup();
      }
    }, 10000);
  });
}

// Remove existing popup
function removeExistingPopup() {
  const existingPopup = document.getElementById('sophiary-popup');
  if (existingPopup) {
    existingPopup.remove();
  }
}

// Function to fetch OGP data (due to CORS issues, you need to use a proxy or handle this in the background script)
async function fetchOgpData(url) {
  try {
    // Note: Due to CORS issues, you need to use a proxy server or handle this in the background script
    const response = await fetch(`https://your-proxy-server.com/fetch-ogp?url=${encodeURIComponent(url)}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch OGP data:', error);
    return {
      title: '',
      description: '',
      image: ''
    };
  }
}
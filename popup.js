document.addEventListener('DOMContentLoaded', function () {
  const input = document.getElementById('word-input');
  const button = document.getElementById('search-button');

  button.addEventListener('click', function () {
    const word = input.value.trim();
    if (word) {
      // Search in Sophiary
      const url = `https://sophiary-web.com/search/en-ja/${encodeURIComponent(word.toLowerCase())}`;
      chrome.tabs.create({ url });
    }
  });

  input.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      button.click();
    }
  });

  // Test part of speech conversion as an example
  console.log('Japanese for noun:', getPartOfSpeechJapanese('noun'));
  console.log('Japanese for verb:', getPartOfSpeechJapanese('verb'));
});
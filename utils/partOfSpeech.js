/**
 * Enum representing parts of speech in English
 */
const PartOfSpeech = {
  NOUN: 'noun',
  VERB: 'verb',
  ADJECTIVE: 'adjective',
  ADVERB: 'adverb',
  PRONOUN: 'pronoun',
  PREPOSITION: 'preposition',
  CONJUNCTION: 'conjunction',
  INTERJECTION: 'interjection',
  ARTICLE: 'article',
  DETERMINER: 'determiner',
  NUMERAL: 'numeral'
};

/**
 * Mapping of English parts of speech to Japanese
 */
const PartOfSpeechJapanese = {
  'noun': '名詞',
  'verb': '動詞',
  'adjective': '形容詞',
  'adverb': '副詞',
  'pronoun': '代名詞',
  'preposition': '前置詞',
  'conjunction': '接続詞',
  'interjection': '間投詞',
  'article': '冠詞',
  'determiner': '限定詞',
  'numeral': '数詞'
};

/**
 * Function to convert English part of speech string to Japanese
 * @param {string} pos English part of speech string
 * @returns {string} Corresponding Japanese part of speech name, or an empty string if not found
 */
function getPartOfSpeechJapanese(pos) {
  try {
    const normalizedPos = pos.toLowerCase();
    return PartOfSpeechJapanese[normalizedPos] || '';
  } catch {
    return '';
  }
}

// Export for use in extension
if (typeof module !== 'undefined') {
  module.exports = {
    PartOfSpeech,
    PartOfSpeechJapanese,
    getPartOfSpeechJapanese
  };
}
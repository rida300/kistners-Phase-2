/** @function sanitize 
 * Sanitizes text by escaping HTML 
 * @param {string} text - the text to sanitize 
 * @returns {string} the sanitized text 
 */
function sanitize(text) {
  return text.replace(/</g, '&lt;').replace(/>/g, '&gt');
}

/** @module sanitize 
 * Provides a function to sanitize HTML text
 */
module.exports = sanitize;
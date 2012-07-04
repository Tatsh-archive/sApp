/**
 * Markdown-handling textarea.
 * @constructor
 * @param {string} name Name of the field.
 * @param {string} label Label for the field.
 * @returns {sMarkdownTextAreaField} The field.
 */
var sMarkdownTextAreaField = function (name, label) {
  this.parent.constructor.call(this, name);

  var id = sHTML.makeFormElementID(name);

  /**
   * @type Element
   * @private
   */
  this._labelDOMElement = null;

  if (label) {
    this._labelDOMElement = sDoc.newElement('label');
    this._labelDOMElement.setAttribute('for', id);
    this._labelDOMElement.appendChild(document.createTextNode(label));
  }

  /**
   * @type Element
   * @private
   */
  this._DOMElement = document.createElement('div');
  this._DOMElement.className = 'form-textarea-container';

  /**
   * @type Element
   * @private
   */
  this._fieldDOMElement = document.createElement('textarea');
  this._fieldDOMElement.setAttribute('name', name);
  this._fieldDOMElement.setAttribute('id', id);
  this._fieldDOMElement.className = 'form-textarea';

  if (label) {
    this._DOMElement.appendChild(this._labelDOMElement);
  }
  this._DOMElement.appendChild(this._fieldDOMElement);

  return this;
};
/**
 * @type {sTextAreaField}
 */
sMarkdownTextAreaField.prototype = new sTextAreaField('', '');
sMarkdownTextAreaField.prototype.parent = sTextAreaField.prototype;

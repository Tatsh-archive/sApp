/**
 * Represents a custom field, typically for markup.
 * @constructor
 * @param {string} [className] Class names to add.
 * @returns {sCustomField} The object.
 */
var sCustomField = function (className) {
  this.parent.constructor.call(this);

  /**
   * @type {Element}
   * @private
   */
  this._DOMElement = sDoc.newElement('div');
  this._DOMElement.className = 'form-custom-container';

  if (className) {
    this._DOMElement.className += ' ' + className;
  }

  /**
   * @type {sElement}
   * @private
   */
  this._sel = q(this._DOMElement);

  return this;
};
/**
 * @type sView
 * @private
 */
sCustomField.prototype = new sView();
sCustomField.prototype.parent = sView.prototype;
/**
 * Appends an element to the parent element.
 * @param {sElement} sel <code>sElement</code> instance of element to append.
 * @returns {sCustomField} The object to allow method chaining.
 */
sCustomField.prototype.append = function (sel) {
  this._sel.append(sel);
  return this;
};
/**
 * Overwrites <code>innerHTML</code> property of the main DOM element this
 *   object represents.
 * @param {string} html HTML to overwrite with.
 * @returns {sCustomField}
 */
sCustomField.prototype.setInnerHTML = function (html) {
  this._DOMElement.innerHTML = html;
  this._sel = q(this._DOMElement);
  return this;
};

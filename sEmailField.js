/**
 * Represents an input with type <code>email</code>.
 * @constructor
 * @param {string} name Name of the field.
 * @returns {sEmailField} The field object.
 */
var sEmailField = function (name) {
  this.parent.constructor.call(this, name);

  /**
   * @type Element
   * @private
   */
  this._DOMElement = document.createElement('div');
  this._DOMElement.className = 'form-email-container';

  /**
   * @type Element
   * @private
   */
  this._fieldDOMElement = document.createElement('input');
  this._fieldDOMElement.className = 'form-email';
  this._fieldDOMElement.setAttribute('type', 'email');
  this._fieldDOMElement.setAttribute('name', name);

  this._DOMElement.appendChild(this._fieldDOMElement);

  return this;
};
/**
 * @type sTextField
 * @private
 */
sEmailField.prototype = new sTextField('');
sEmailField.prototype.parent = sTextField.prototype;

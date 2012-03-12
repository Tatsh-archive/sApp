/**
 * Represents a form password field.
 * @constructor
 * @param {string} name Name for the field.
 * @returns {sPasswordField} The password field object.
 */
var sPasswordField = function (name) {
  this.parent.constructor.call(this, name);

  /**
   * @type Element
   * @private
   */
  this._DOMElement = document.createElement('div');
  this._DOMElement.className = 'form-password-container';

  /**
   * @type Element
   * @private
   */
  this._fieldDOMElement = document.createElement('input');
  this._fieldDOMElement.className = 'form-password';
  this._fieldDOMElement.setAttribute('type', 'password');
  this._fieldDOMElement.setAttribute('name', name);

  this._DOMElement.appendChild(this._fieldDOMElement);

  return this;
};
/**
 * @private
 * @type sTextField
 */
sPasswordField.prototype = new sTextField('');
sPasswordField.prototype.parent = sTextField.prototype;

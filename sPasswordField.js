/**
 * @constructor
 */
var sPasswordField = function (name) {
  this.parent.constructor.call(this, name);

  this._DOMElement = document.createElement('div');
  this._DOMElement.className = 'form-password-container';
  this._fieldDOMElement = document.createElement('input');
  this._fieldDOMElement.className = 'form-password';
  this._fieldDOMElement.setAttribute('type', 'password');
  this._fieldDOMElement.setAttribute('name', name);
  this._DOMElement.appendChild(this._fieldDOMElement);

  return this;
};
sPasswordField.prototype = new sTextField('');
sPasswordField.prototype.parent = sTextField.prototype;

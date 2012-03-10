/**
 * @constructor
 */
var sTextField = function (name) {
  this.parent.constructor.call(this);

  this._labelDOMElement = null;
  this._fieldDOMElement = document.createElement('input');
  this._fieldDOMElement.setAttribute('type', 'text');
  this._fieldDOMElement.setAttribute('name', name);
  this._fieldDOMElement.className = 'form-textfield';
  this._DOMElement = document.createElement('div');
  this._DOMElement.className = 'form-textfield-container';
  this._DOMElement.appendChild(this._fieldDOMElement);

  return this;
};
sTextField.prototype = new sFormField();
sTextField.prototype.parent = sFormField.prototype;
sTextField.prototype.setPlaceholder = function (placeholder) {
  this._fieldDOMElement.setAttribute('placeholder', placeholder);
  return this;
};
sTextField.prototype.setLabel = function (label) {
  if (this._labelDOMElement === null) {
    this._labelDOMElement = document.createElement('label');
  }
  this._labelDOMElement.innerHTML = label;
  this._DOMElement.prependChild(this._labelDOMElement);
  return this;
};

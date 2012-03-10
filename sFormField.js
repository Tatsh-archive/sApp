/**
 * @constructor
 */
var sFormField = function () {
  this.parent.constructor.call(this);

  this._fieldDOMElement = document.createElement('input');
  this._value = '';
  this._DOMElement = document.createElement('div');
  this._DOMElement.appendChild(this._fieldDOMElement);

  return this;
};
sFormField.prototype = new sView();
sFormField.prototype.parent = sView.prototype;
sFormField.prototype.getFieldDOMElement = function () {
  return this._fieldDOMElement;
};

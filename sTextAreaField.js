/**
 * @constructor
 */
var sTextAreaField = function (name) {
  this.parent.constructor.call(this, name);

  this._DOMElement = document.createElement('div');
  this._DOMElement.className = 'form-textarea-container';

  this._fieldDOMElement = document.createElement('textarea');
  this._fieldDOMElement.setAttribute('name', name);
  this._fieldDOMElement.setAttribute('id', sHTML.makeFormElementID(name));
  this._fieldDOMElement.className = 'form-textarea';

  this._DOMElement.appendChild(this._fieldDOMElement);

  return this;
};
sTextAreaField.prototype = new sFormField();
sTextAreaField.prototype.parent = sFormField.prototype;
sTextAreaField.prototype.constructor = sTextAreaField;
sTextAreaField.prototype.setValue = function (val) {
  this._fieldDOMElement.innerHTML = fHTML.decode(val);
  return this;
};
sTextAreaField.prototype.setPlaceholder = function (placeholder) {
  this._fieldDOMElement.setAttribute('placeholder', placeholder);
  return this;
};

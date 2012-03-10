var sView = function () {
  this._DOMElement = null;
  this._isAppended = false;
  return this;
};
sView.prototype.setDOMElement = function (element) {
  this._DOMElement = element;
};
sView.prototype.getDOMElement = function () {
  return this._DOMElement;
};
sView.prototype.isAppended = function () {
  return this._isAppended;
};
sView.prototype.appendTo = function (element) {
  this._isAppended = true;
  element.appendChild(this._DOMElement);
  return this;
};

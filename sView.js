/**
 * @constructor
 */
var sView = function () {
  this._DOMElement = null;
  this._isAppended = false;
  this._rendered = false;
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
  this._rendered = true;
  element.appendChild(this._DOMElement);
  return this;
};
sView.prototype.setRendered = function (bool) {
  this._rendered = bool ? true : false;
  return this;
};
sView.prototype.isRendered = function () {
  return this._rendered;
};
sView.prototype.prependTo = function (element) {
  this._isAppended = true;
  this._rendered = true;
  element.insertBefore(this._DOMElement, element.firstChild);
  return this;
};
sView.prototype.insertAfterId = function (id) {
  var element = document.getElementById(id);

  if (element !== null) {
    if (element.nextSibling) {
      element.parentNode.insertBefore(this._DOMElement, element.nextSibling);
    }
    else {
      element.parentNode.appendChild(this._DOMElement);
    }
  }

  return this;
};

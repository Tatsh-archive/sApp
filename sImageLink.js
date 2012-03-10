/**
 * @constructor
 */
var sImageLink = function (url, src, alt) {
  this.parent.constructor.call(this);

  this._image = new sImage(src, alt);

  this._title = '';
  this._DOMElement = document.createElement('a');
  this._DOMElement.setAttribute('href', url);
  this._image.appendTo(this._DOMElement);

  return this;
};
sImageLink.prototype = new sView();
sImageLink.prototype.parent = sView.prototype;
sImageLink.prototype.getImage = function () {
  return this._image;
};
sImageLink.prototype.setTitle = function (title) {
  this._title = title;
  this._DOMElement.setAttribute('title', title);
  return this;
};
sImageLink.prototype.getTitle = function (title) {
  return this._title;
};
sImageLink.prototype.setImage = function (image) {
  this._image = image;
  this._DOMElement.innerHTML = '';
  this._DOMElement.appendChild(this._image.getDOMElement());
  return this;
};
sImageLink.prototype.getImage = function (image) {
  return this._image;
};

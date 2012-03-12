/**
 * Represents a link with an image.
 * @constructor
 * @param {string} url URL for the link.
 * @param {string} src Source URI for the image.
 * @param {string} alt Alternative txt for the a tag.
 * @returns {sImageLink} The image link object.
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
/**
 * @type sView
 * @private
 */
sImageLink.prototype = new sView();
sImageLink.prototype.parent = sView.prototype;
/**
 * Gets the image object.
 * @returns {sImage} The image object.
 */
sImageLink.prototype.getImage = function () {
  return this._image;
};
/**
 * Sets the title for the a tag.
 * @param {string} title The title.
 * @returns {sImageLink} The object to allow method chaining.
 */
sImageLink.prototype.setTitle = function (title) {
  this._title = title;
  this._DOMElement.setAttribute('title', title);
  return this;
};
/**
 * Gets the title of the a tag.
 * @returns {string} The title.
 */
sImageLink.prototype.getTitle = function (title) {
  return this._title;
};
/**
 * Set the image for this link.
 * @param {sImage} image The image object to use.
 * @returns {sImageLink} The object to allow method chaining.
 */
sImageLink.prototype.setImage = function (image) {
  this._image = image;
  this._DOMElement.innerHTML = '';
  this._DOMElement.appendChild(this._image.getDOMElement());
  return this;
};

/**
 * Represents an image.
 * @constructor
 * @param {string} src Source of the image.
 * @param {string} alt Alternative text for the image.
 * @returns {sImage} The image object.
 * @augments sView
 */
var sImage = function (src, alt) {
  this.parent.constructor.call(this);

  if (alt === undefined) {
    alt = '';
  }

  this._alt = alt;
  this._title = '';
  this._DOMElement = document.createElement('img');
  this._DOMElement.setAttribute('src', src);
  this._DOMElement.setAttribute('alt', this._alt);

  this._onloadHandler = function () {};

  return this;
};
/**
 * @type sView
 * @private
 */
sImage.prototype = new sView();
sImage.prototype.parent = sView.prototype;
/**
 * Set the source URI of the image.
 * @param {string} src The URI of the image.
 * @param {function()} [onloadHandler] The onload handler function.
 * @returns {sImage} The ojbect to allow method chaining.
 */
sImage.prototype.setSource = function (src, onloadHandler) {
  var sel = q(this._DOMElement);

  if (onloadHandler !== undefined) {
    sel.unbind('load', this._onloadHandler);
    this._onloadHandler = onloadHandler;
  }
  else {
    this._onloadHandler = function () {};
  }

  if (this.isAppended()) {
    sel.bind('load', this._onloadHandler).setAttributes({'src': src});
    return this;
  }

  this._DOMElement = document.createElement('img');
  this._DOMElement.setAttribute('src', src);
  this._DOMElement.setAttribute('alt', this._alt);
  return this;
};
/**
 * Set the alternative text for the image.
 * @param {string} alt The alternative text.
 * @returns {sImage} The ojbect to allow method chaining.
 */
sImage.prototype.setAlt = function (alt) {
  this._alt = alt;
  this._DOMElement.setAttribute('alt', alt);
  return this;
};
// TODO
// sImage.prototype.setTitle = function (title) {
//
// };

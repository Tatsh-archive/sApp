/**
 * Represents an image.
 * @constructor
 * @param {string} [src] Source of the image.
 * @param {string} [alt] Alternative text for the image.
 * @returns {sImage} The image object.
 * @augments sView
 */
var sImage = function (src, alt) {
  this.parent.constructor.call(this);

  if (alt === undefined) {
    alt = '';
  }
  if (src === undefined) {
    src = '';
  }

  /**
   * @type string
   * @private
   */
  this._alt = alt;

  /**
   * @type string
   * @private
   */
  this._src = src;

  /**
   * @type number
   * @private
   */
  this._height = 0;

  /**
   * @type number
   * @private
   */
  this._width = 0;

  /**
   * @type (Element|null)
   * @private
   */
  this._DOMElement = null;

  if (this._src) {
    this.render();
  }

  return this;
};
/**
 * @type sView
 * @private
 */
sImage.prototype = new sView();
sImage.prototype.parent = sView.prototype;
/**
 * Render the view.
 * @param {boolean} [force=false] Force the re-rendering.
 * @returns {sImage} The object to allow method chaining.
 */
sImage.prototype.render = function (force) {
  if (!this.isRendered() || force) {
    this._DOMElement = document.createElement('img');
    this._DOMElement.setAttribute('src', this._src);
    this._DOMElement.setAttribute('alt', this._alt);

    if (this._width) {
      this._DOMElement.setAttribute('width', this._width);
    }
    if (this._height) {
      this._DOMElement.setAttribute('height', this._height);
    }

    this.setRendered(true);
  }
  return this;
};
/**
 * Set the source URI of the image.
 * @param {string} src The URI of the image.
 * @param {function()} [onloadHandler] The onload handler function.
 * @returns {sImage} The object to allow method chaining.
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
/**
 * Set the height of the DOM element.
 * @param {number} height Height.
 * @returns {sImage} The ojbect to allow method chaining.
 */
sImage.prototype.setHeight = function (height) {
  this._height = height;
  this._DOMElement.setAttribute('height', height);
  return this;
};
/**
 * Set the width of the DOM element.
 * @param {number} width Width.
 * @returns {sImage} The ojbect to allow method chaining.
 */
sImage.prototype.setWidth = function (width) {
  this._width = width;
  this._DOMElement.setAttribute('width', width);
  return this;
};

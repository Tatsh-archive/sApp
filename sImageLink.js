/**
 * Represents a link (anchor tag) with an image.
 * @constructor
 * @param {string} url URL for the link.
 * @param {string} src Source URI for the image.
 * @param {string} [alt] Alternative text for the anchor tag.
 * @param {string} [title] Title for the anchor tag.
 * @returns {sImageLink} The image link object.
 * @augments sView
 */
var sImageLink = function (url, src, alt, title) {
  this.parent.constructor.call(this);

  /**
   * @type sImage
   * @private
   */
  this._image = new sImage(src, alt);

  /**
   * @type string
   * @private
   */
  this._title = '';

  /**
   * @type string
   * @private
   */
  this._url = url;

  /**
   * @type (Element|null)
   * @private
   */
  this._DOMElement = null;

  this.render();

  return this;
};
/**
 * @type sView
 * @private
 */
sImageLink.prototype = new sView();
sImageLink.prototype.parent = sView.prototype;
/**
 * Renders the view.
 * @param {boolean} [force=false] Force re-rendering.
 * @returns {sImageLink} The object to allow method chaining.
 */
sImageLink.prototype.render = function (force) {
  if (!this.isRendered() || !this._DOMElement || force) {
    if (!this._DOMElement) {
      this._DOMElement = sDoc.newElement('a');
    }

    q(this._DOMElement).removeChildren();
    this._DOMElement.className = 'hvideo-list-image';

    this._DOMElement.setAttribute('href', this._url);
    this._image.appendTo(this._DOMElement);

    this.setRendered(true);
  }

  return this;
};
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

  q(this._DOMElement).removeChildren();

  this._DOMElement.appendChild(this._image.getDOMElement());

  return this;
};

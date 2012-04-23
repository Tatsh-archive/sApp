/**
 * Creates a header view.
 * @constructor
 * @param {string} text Text to display in the header.
 * @param {number} [level] Header level. 1-6. Default is 2.
 * @param {string} [linkURL] If specified, the header element will contain
 *   the text as a link to the URL specified.
 * @returns {sHeader} The view object.
 * @augments sView
 */
var sHeader = function (text, level, linkURL) {
  /**
   * @type Element
   * @private
   */
  this._DOMElement = sDoc.newElement('header');

  /**
   * @type number
   * @private
   */
  this._level = level || 2;

  /**
   * @type Element
   * @private
   */
  this._hElement = sDoc.newElement('h' + level);

  /**
   * @type string
   * @private
   */
  this._text = text;

  /**
   * @type (Element|null)
   * @private
   */
  this._linkElement = linkURL ? sDoc.newElement('a') : null;

  /**
   * @type (string|null)
   * @private
   */
  this._linkURL = linkURL ? linkURL : null;

  /**
   * @type (function((sEvent|Event))|null)
   * @private
   */
  this._clickHandler = null;

  this.render();

  return this;
};
sHeader.prototype = new sView();
sHeader.prototype.parent = sView.prototype;
/**
 * Sets the click handler.
 * @param {function((sEvent|Event))} fn Click handler function.
 * @returns {sHeader} The object to allow method chaining.
 */
sHeader.prototype.setClickHandler = function (fn) {
  this.removeClickHandler();

  this._clickHandler = fn;

  if (!this._linkElement) {
    this._linkElement = sDoc.newElement('a');
  }

  q(this._linkElement).bind('click', this._clickHandler);
  this.render(true);

  return this;
};
/**
 * Removes the click handler if one is set.
 * @returns {sHeader} The object to allow method chaining.
 */
sHeader.prototype.removeClickHandler = function () {
  if (this._clickHandler) {
    q(this._linkElement).unbind('click', this._clickHandler);
  }
  return this;
};
/**
 * Sets the text.
 * @param {string} text Text to set.
 * @returns {sHeader} The object to allow method chaining.
 */
sHeader.prototype.setText = function (text) {
  if (this._linkElement) {
    q(this._linkElement).setText(text);
    return this;
  }

  q(this._hElement).setText(text);

  return this;
};
/**
 * Renders the view.
 * @param {boolean} [force] Force re-rendering.
 * @returns {sHeader} The object to allow method chaining.
 */
sHeader.prototype.render = function (force) {
  if (this.isRendered() && !force) {
    return this;
  }

  q(this._DOMElement).removeChildren();

  if (this._linkElement) {
    this._linkElement.setAttribute('href', this._linkURL);
    q(this._linkElement).setText(this._text);
    this._linkElement.className = 'sheader-link';
    this._hElement.appendChild(this._linkElement);
  }
  else {
    q(this._hElement).setText(this._text);
  }
  this._DOMElement.appendChild(this._hElement);

  this._DOMElement.className = 'sheader';
  this._hElement.className = 'sheader-inner sheader-level-' + this._level;

  this.setRendered(true);

  return this;
};

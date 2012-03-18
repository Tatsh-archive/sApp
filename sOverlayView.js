/**
 * Represents an overlay view.
 * @constructor
 * @returns {sOverlayView} The view.
 */
var sOverlayView = function () {
  this.parent.constructor.call(this);

  /**
   * @type Element
   * @private
   */
  this._DOMElement = document.createElement('div');
  this._DOMElement.className = 'soverlay';

  /**
   * @type Object
   * @private
   */
  var css = {
    'display': 'none',
    'zIndex': -2000
  };
  for (var attr in css) {
    this._DOMElement.style[attr] = css[attr];
  }

  return this;
};
/**
 * @type sView
 * @private
 */
sOverlayView.prototype = new sView();
sOverlayView.prototype.parent = sView.prototype;
/**
 * Show the overlay.
 * @returns {sOverlayView} The object to allow method chaining.
 */
sOverlayView.prototype.show = function () {
  this._DOMElement.style.display = 'block';
  return this;
};
/**
 * Hide the overlay.
 * @returns {sOverlayView} The object to allow method chaining.
 */
sOverlayView.prototype.show = function () {
  this._DOMElement.style.display = 'none';
  return this;
};
/**
 * @type sOverlayView
 * @private
 */
sOverlayView._static = new sOverlayView();
/**
 * Get the singleton instance.
 * @returns {sOverlayView} The object.
 */
sOverlayView.getInstance = function () {
  if (!sOverlayView._static.isAppended()) {
    sOverlayView._static.appendTo(document.body);
  }
  return sOverlayView._static;
};

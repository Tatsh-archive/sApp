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
   * @type sOverlayView
   * @private
   */
  var instance = this;

  /**
   * Default opacity.
   * @private
   * @type number
   */
  this._opacity = 0.6;

  /**
   * @type Object
   * @private
   */
  var css = {
    'display': 'none',
    'zIndex': -2000,
    'width': sWin.getWidth() + 'px',
    'position': 'fixed',
    'top': 0,
    'height': sWin.getHeight() + 'px',
    'opacity': 0,
    'filter': 'alpha(opacity=0)'
  };
  for (var attr in css) {
    this._DOMElement.style[attr] = css[attr];
  }

  sWin.addEventListener('resize', function () {
    var el = instance.getDOMElement();
    el.style.height = sWin.getHeight() + 'px';
    el.style.width = sWin.getWidth() + 'px';
  });

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
  this._DOMElement.style.filter = 'alpha(opacity=60)';
  this._DOMElement.style.display = 'block';
  this._DOMElement.style.zIndex = 100;
  this._DOMElement.style.opacity = this._opacity;
  return this;
};
/**
 * Hide the overlay.
 * @returns {sOverlayView} The object to allow method chaining.
 */
sOverlayView.prototype.hide = function () {
  this._DOMElement.style.filter = 'alpha(opacity=0)';
  this._DOMElement.style.opacity = 0;
  this._DOMElement.style.zIndex = -2000;
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

/**
 * Base class for form fields.
 * @constructor
 * @returns {sFormField} The form field object.
 */
var sFormField = function () {
  this.parent.constructor.call(this);

  /**
   * @type Element
   * @private
   */
  this._fieldDOMElement = document.createElement('input');

  /**
   * @type string
   * @private
   */
  this._value = '';

  /**
   * The main DOM element.
   * @private
   * @type Element
   */
  this._DOMElement = document.createElement('div');
  this._DOMElement.appendChild(this._fieldDOMElement);

  return this;
};
/**
 * @type sView
 * @private
 */
sFormField.prototype = new sView();
sFormField.prototype.parent = sView.prototype;
/**
 * Get the field DOM element, since fields are wrapped in divs.
 * @returns {Element} The DOM element.
 */
sFormField.prototype.getFieldDOMElement = function () {
  return this._fieldDOMElement;
};

/**
 * Base class for form fields.
 * @constructor
 * @returns {sFormField} The form field object.
 * @augments sView
 */
var sFormField = function () {
  this.parent.constructor.call(this);

  /**
   * @type Element
   * @private
   */
  this._fieldDOMElement = document.createElement('input');

  /**
   * @type Element
   * @private
   */
  this._labelDOMElement = sDoc.newElement('label');

  /**
   * @type boolean
   * @private
   */
  this._labelIsAppended = false;

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
/**
 * Set the field's required attribute.
 * @param {boolean} required If required.
 * @returns {sFormField} The object to allow method chaining.
 */
sFormField.prototype.setRequired = function (required) {
  this._fieldDOMElement.required = required ? true : false;
  return this;
};
/**
 * Disable the field.
 * @returns {sFormField} The object to allow method chaining.
 */
sFormField.prototype.disable = function () {
  this._fieldDOMElement.setAttribute('disabled', 'disabled');
  return this;
};
/**
 * Enable the field.
 * @returns {sFormField} The object to allow method chaining.
 */
sFormField.prototype.enable = function () {
  this._fieldDOMElement.removeAttribute('disabled');
  return this;
};
/**
 * Sets the label text.
 * @param {string|null} text If <code>null</code>, remove the label.
 * @returns {sFormField} The object to allow method chaining.
 */
sFormField.prototype.setLabel = function (text) {
  if (text === null) {
    if (this._labelIsAppended) {
      this._DOMElement.removeChild(this._labelDOMElement);
      this._labelIsAppended = false;
    }
    return this;
  }

  q(this._labelDOMElement).removeChildren().setText(text);

  if (!this._labelIsAppended) {
    this._DOMElement.insertBefore(this._labelDOMElement, this._fieldDOMElement);
    this._labelIsAppended = true;
  }

  return this;
};

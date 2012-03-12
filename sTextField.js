/**
 * Represents a one-line text field.
 * @constructor
 * @param {string} name Name for the field.
 * @returns {sTextField} The text field object.
 */
var sTextField = function (name) {
  this.parent.constructor.call(this);

  /**
   * @type (Element|null)
   * @private
   */
  this._labelDOMElement = null;

  /**
   * @type Element
   * @private
   */
  this._fieldDOMElement = document.createElement('input');
  this._fieldDOMElement.setAttribute('type', 'text');
  this._fieldDOMElement.setAttribute('name', name);
  this._fieldDOMElement.className = 'form-textfield';

  /**
   * @type Element
   * @private
   */
  this._DOMElement = document.createElement('div');
  this._DOMElement.className = 'form-textfield-container';
  this._DOMElement.appendChild(this._fieldDOMElement);

  return this;
};
/**
 * @type sFormField
 * @private
 */
sTextField.prototype = new sFormField();
sTextField.prototype.parent = sFormField.prototype;
/**
 * Set the placeholder text of the field.
 * @param {string} placeholder The placeholder text.
 * @returns {sTextAreaField} The object to allow method chaining.
 */
sTextField.prototype.setPlaceholder = function (placeholder) {
  this._fieldDOMElement.setAttribute('placeholder', placeholder);
  return this;
};
// TODO
// sTextField.prototype.setLabel = function (label) {
//   if (this._labelDOMElement === null) {
//     this._labelDOMElement = document.createElement('label');
//   }
//   this._labelDOMElement.innerHTML = label;
//   //this._DOMElement.parentNode.insertAfter
//   //this._DOMElement.prependChild(this._labelDOMElement);
//   return this;
// };

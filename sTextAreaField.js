/**
 * Represents a form textarea field.
 * @constructor
 * @param {string} name Name for the field.
 * @param {string} [label] Label for the field.
 * @returns {sTextAreaField} The textarea field object.
 * @augments sFormField
 */
var sTextAreaField = function (name, label) {
  this.parent.constructor.call(this, name);

  var id = sHTML.makeFormElementID(name);

  /**
   * @type {Element|null}
   * @private
   */
  this._labelDOMElement = null;

  if (label) {
    this._labelDOMElement = sDoc.newElement('label');
    this._labelDOMElement.setAttribute('for', id);
    this._labelDOMElement.appendChild(document.createTextNode(label));
  }

  /**
   * @type Element
   * @private
   */
  this._DOMElement = document.createElement('div');
  this._DOMElement.className = 'form-textarea-container';

  /**
   * @type Element
   * @private
   */
  this._fieldDOMElement = document.createElement('textarea');
  this._fieldDOMElement.setAttribute('name', name);
  this._fieldDOMElement.setAttribute('id', id);
  this._fieldDOMElement.className = 'form-textarea';

  if (label) {
    this._DOMElement.appendChild(this._labelDOMElement);
  }
  this._DOMElement.appendChild(this._fieldDOMElement);

  return this;
};
/**
 * @type sFormField
 * @private
 */
sTextAreaField.prototype = new sFormField();
sTextAreaField.prototype.parent = sFormField.prototype;
/**
 * Set the value of the field.
 * @param {string} val The value.
 * @returns {sTextAreaField} The object to allow method chaining.
 */
sTextAreaField.prototype.setValue = function (val) {
  this._fieldDOMElement.innerHTML = fHTML.decode(val);
  return this;
};
/**
 * Set the placeholder text of the field.
 * @param {string} placeholder The placeholder text.
 * @returns {sTextAreaField} The object to allow method chaining.
 */
sTextAreaField.prototype.setPlaceholder = function (placeholder) {
  this._fieldDOMElement.setAttribute('placeholder', placeholder);
  inputPlaceholder(this._fieldDOMElement);
  return this;
};

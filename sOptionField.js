/**
 * Represents a &lt;select&gt; field.
 * @constructor
 * @param {string} name Name of the field.
 * @param {Array} [options] Array of objects that have keys 'value' and 'label'.
 * @returns {sOptionField} The option field object.
 * @augments sFormField
 */
var sOptionField = function (name, options) {
  this.parent.constructor.call(this);

  /**
   * @type Element
   * @private
   */
  this._DOMElement = sDoc.newElement('div');

  this._labelElement = sDoc.newElement('label');

  /**
   * @type Element
   * @private
   */
  this._fieldDOMElement = sDoc.newElement('select');

  /**
   * @type Element
   * @private
   */
  var option;

  if (options && options.length) {
    for (var i = 0; i < options.length; i++) {
      if (options[i].value && options[i].label) {
        option = sDoc.newElement('option');
        option.setAttribute('value', options[i].value);
        option.appendChild(document.createTextNode(options[i].label));
        this._fieldDOMElement.appendChild(option);
      }
    }
  }

  this._fieldDOMElement.className = 'form-select';
  this._fieldDOMElement.setAttribute('name', name);
  this._DOMElement.className = 'form-select-container';
  this._DOMElement.appendChild(this._fieldDOMElement);

  return this;
};
/**
 * @type sFormField
 * @private
 */
sOptionField.prototype = new sFormField();
sOptionField.prototype.parent = sFormField.prototype;
sOptionField.prototype.constructor = sOptionField;

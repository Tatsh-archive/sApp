/**
 * Represents a set of buttons.
 * @constructor
 * @returns {sButtonBar} The button bar object.
 * @augments sView
 */
var sButtonBar = function () {
  this.parent.constructor.call(this);

  /**
   * @type Element
   * @private
   */
  this._labelDOMElement = sDoc.newElement('label');
  this._labelDOMElement.className = 'sbutton-bar-label';

  /**
   * @type string
   * @private
   */
  this._labelText = '';

  /**
   * @type Element
   * @private
   */
  this._DOMElement = sDoc.newElement('div');
  this._DOMElement.className = 'sbutton-bar-container';

  /**
   * @type Element
   * @private
   */
  this._ulDOMElement = sDoc.newElement('ul');
  this._ulDOMElement.className = 'sbutton-bar';

  /**
   * @type Object
   * @private
   */
  this._childElements = {};

  /**
   * @type Object
   * @private
   */
  this._eventHandlers = {};

  /**
   * @type Object
   * @private
   */
  this._buttons = {};

  this._DOMElement.appendChild(this._ulDOMElement);

  return this;
};
/**
 * @type sView
 * @private
 */
sButtonBar.prototype = new sView();
sButtonBar.prototype.parent = sView.prototype;
/**
 * @returns {sButtonBar} The object to allow method chaining.
 */
sButtonBar.prototype._setClasses = function () {
  var els = this._ulDOMElement.getElementsByTagName('li');

  if (els.length) {
    for (var i = 0; i < els.length; i++) {
      q(els[i]).addClass('item-' + (i+1)).removeClass('last').removeClass('first');
    }

    q(els[0]).addClass('first');
    q(els[els.length - 1]).addClass('last');
  }

  return this;
};
/**
 * Adds a button.
 * @param {string} label Label text.
 * @param {function(sButton)} fn Callback.
 * @returns {sButtonBar} The object to allow method chaining.
 */
sButtonBar.prototype.addButton = function (label, fn) {
  var li = q(sDoc.newElement('li'));
  var realLi = li.get();
  var button = new sButton(label, fn);

  this._childElements[label] = realLi;
  this._eventHandlers[label] = fn;
  this._buttons[label] = button;

  button.appendTo(realLi);
  this._ulDOMElement.appendChild(realLi);

  this._setClasses();

  return this;
};
/**
 * Get an sButton instance by its label.
 * @param {string} label The label text.
 * @returns {sButton|null} The sButton instance, or <code>null</code>.
 */
sButtonBar.prototype.getButtonByLabel = function (label) {
  if (this._buttons[label] === undefined) {
    return null;
  }
  return this._buttons[label];
};
/**
 * Add a custom view. The view is expected to extend off sView.
 * @param {sView} view An sView instance or subclass of sView instance.
 * @param {string} [name] Name of the view for later retrieval.
 * @return {sButtonBar} The object to allow method chaining.
 */
sButtonBar.prototype.addCustomView = function (view, name) {
  var nameIsRandom = false;
  this._DOMElement.appendChild(view.getDOMElement());

  if (name) {
    this._subViews[name] = view;
  }

  return this;
};
/**
 * Disable all buttons.
 * @return {sButtonBar} The object to allow method chaining.
 */
sButtonBar.prototype.disableButtons = function () {
  for (var key in this._buttons) {
    if (this._buttons.hasOwnProperty(key)) {
      this._buttons[key].disable();
    }
  }
  return this;
};
/**
 * Enable all buttons.
 * @return {sButtonBar} The object to allow method chaining.
 */
sButtonBar.prototype.enableButtons = function () {
  for (var key in this._buttons) {
    if (this._buttons.hasOwnProperty(key)) {
      this._buttons[key].enable();
    }
  }
  return this;
};
/**
 * Sets the label text. If the label is not appended, it will be after calling
 *   this function with a non-zero length string.
 * @param {string} text Text to set. If a false-like value, the label will be
 *   removed.
 * @return {sButtonBar} The object to allow method chaining.
 */
sButtonBar.prototype.setLabelText = function (text) {
  if (!text) {
    this._labelText = '';
    if (this._labelDOMElement.parentElement) {
      this._labelDOMElement.parentElement.removeChild(this._labelDOMElement);
    }
    return this;
  }

  this._labelText = text;
  q(this._labelDOMElement).setText(this._labelText);

  if (!this._labelDOMElement.parentElement) {
    this._DOMElement.insertBefore(this._labelDOMElement, this._ulDOMElement);
  }

  return this;
};
// TODO Implement.
// /**
//  * Removes a button.
//  * @param {string} label Label of the button to remove.
//  * @returns {sButtonBar} The object to allow method chaining.
//  */
// sButtonBar.prototype.removeButton = function (label) {
//   if (this._childElements[label]) {
//     var eventHandler = this._eventHandlers[label];
//     q(this._childElements[label]).unbind('click', eventHandler).remove();
//   }
//
//   return this;
// };

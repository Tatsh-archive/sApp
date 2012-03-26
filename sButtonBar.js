/**
 * Represents a set of buttons.
 * @constructor
 * @returns {sButtonBar} The button bar object.
 */
var sButtonBar = function () {
  this.parent.constructor.call(this);

  /**
   * @type Element
   * @private
   */
  this._DOMElement = sDoc.newElement('ul');
  this._DOMElement.className = 'sbutton-bar';

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
  var el = q(this._DOMElement).getElementsByClassName('last');
  if (el.length) {
    for (var i = 0; i < el.length; i++) {
      el[i].className = '';
    }
  }
  this._DOMElement.childNodes[this._DOMElement.childNodes.length - 1].className = 'last';
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
  this._DOMElement.appendChild(realLi);

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

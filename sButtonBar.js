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

  button.appendTo(realLi);
  this._DOMElement.appendChild(realLi);

  this._setClasses();

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

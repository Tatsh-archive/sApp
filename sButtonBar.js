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
  var els = this._DOMElement.getElementsByTagName('li');

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
/**
 * Add a custom view. The view is expected to extend off sView.
 * @param {sView} view An sView instance or subclass of sView instance.
 * @param {string} [name] Name of the view for later retrieval.
 * @return {sButtonBar} The object to allow method chaining.
 */
sButtonBar.prototype.addCustomView = function (view, name) {
  var li = sDoc.newElement('li');
  var nameIsRandom = false;
  li.appendChild(view.getDOMElement());
  this._DOMElement.appendChild(li);
  this._setClasses();

  if (!name) {
    name = fCryptography.randomString();
    nameIsRandom = true;
  }

  this._subViews[name] = view;
  if (!nameIsRandom) {
    li.id = sHTML.makeFormElementID(name);
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

/**
 * Represents a button.
 * @param {string} [text] Text to display.
 * @param {function(sButton)} [fn] The callback.
 * @returns {sButton} The button object.
 * @constructor
 */
var sButton = function (text, fn) {
  this.parent.constructor.call(this);

  /**
   * @type string
   * @private
   */
  this._text = text ? text : '';
  /**
   * @type boolean
   * @private
   */
  this._enabled = true;
  /**
   * @type Element
   * @private
   */
  this._DOMElement = sDoc.newElement('a');
  /**
   * @type {function(sButton)}
   * @private
   */
  this._userClickHandler = typeof fn === 'function' ? fn : function () {};
  /**
   * @type sButton
   * @private
   */
  var button = this;
  /**
   * @this {Element}
   * @private
   */
  this._clickHandler = function (event) {
    if (button.isDisabled()) {
      event.preventDefault();
      return false;
    }

    button._userClickHandler(button);
    event.preventDefault();
    return false;
  };

  // Render
  this._DOMElement.setAttribute('href', '#');
  this._DOMElement.setAttribute('role', 'button');
  this._DOMElement.appendChild(document.createTextNode(this._text));
  q(this._DOMElement).bind('click', this._clickHandler);
  this._setClasses();
  if (text) {
    this._DOMElement.id = sHTML.makeFormElementID(text);
  }

  return this;
};
/**
 * @type sView
 * @private
 */
sButton.prototype = new sView();
sButton.prototype.parent = sView.prototype;
/**
 * Set the text.
 * @param {string} text The text.
 * @returns {sButton} The object to allow method chaining.
 */
sButton.prototype.setText = function (text) {
  this._text = text ? text : '';
  q(this._DOMElement).removeChildren();
  this._DOMElement.appendChild(document.createTextNode(this._text));
  return this;
};
/**
 * @returns {sButton} The object to allow method chaining.
 * @private
 */
sButton.prototype._setClasses = function () {
  if (this._enabled) {
    this._DOMElement.className = 'sbutton';
    return this;
  }

  this._DOMElement.className = 'sbutton sbutton-disabled';

  return this;
};
/**
 * Set the click handler function.
 * @param {function(sButton)} fn The callback.
 * @returns {sButton} The object to allow method chaining.
 */
sButton.prototype.setClickHandler = function (fn) {
  this._userClickHandler = fn;
  return this;
};
/**
 * If the button is disabled.
 * @returns {boolean} If the button is disabled.
 */
sButton.prototype.isDisabled = function () {
  return !this._enabled;
};
/**
 * If the button is enabled.
 * @returns {boolean} If the button is enabled.
 */
sButton.prototype.isEnabled = function () {
  return this._enabled;
};
/**
 * Disables the button. Adds a class <code>sbutton-disabled</code> that can
 *   be used to style the button in this state.
 * @param {Array} [classes] Other classes to add.
 * @returns {sButton} The object to allow method chaining.
 */
sButton.prototype.disable = function (classes) {
  var oldClasses = this._DOMElement.className.split(' ');

  this._enabled = false;

  if (classes && classes.length) {
    var newClasses = ['sbutton', 'sbutton-disabled'];
    var i;

    for (i = 0; i < oldClasses.length; i++) {
      newClasses.push(fUTF8.trim(oldClasses[i]));
    }

    for (i = 0; i < classes.length; i++) {
      newClasses.push(classes[i]);
    }

    this._DOMElement.className = newClasses.join(' ');

    return this;
  }

  this._DOMElement.setAttribute('aria-disabled', true);
  this._setClasses();

  return this;
};
/**
 * Disables the button. Adds a class <code>sbutton-disabled</code> that can
 *   be used to style the button in this state.
 * @param {Array} [classes] Other classes to add.
 * @returns {sButton} The object to allow method chaining.
 */
sButton.prototype.enable = function (classes) {
  var oldClasses = this._DOMElement.className.split(' ');

  this._enabled = true;

  if (classes && classes.length) {
    var newClasses = ['sbutton'];
    var i;

    for (i = 0; i < oldClasses.length; i++) {
      newClasses.push(fUTF8.trim(oldClasses[i]));
    }

    for (i = 0; i < classes.length; i++) {
      newClasses.push(classes[i]);
    }

    this._DOMElement.className = newClasses.join(' ');

    return this;
  }

  this._DOMElement.setAttribute('aria-disabled', false);
  this._setClasses();

  return this;
};

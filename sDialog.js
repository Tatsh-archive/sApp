/**
 * Represents a dialog, which typically appear in the middle of the window.
 * @constructor
 * @param {string} title The title for the dialog.
 * @returns {sDialog} The dialog object.
 * @augments sView
 */
var sDialog = function (title) {
  // Just in case, must come before any others to make it easier to use
  var overlay = sOverlayView.getInstance();

  q(overlay.getDOMElement()).bind('click', function () {
    sHistory.removeState('dialog');
  });

  this.parent.constructor.call(this);

  /**
   * @type string
   * @private
   */
  this._title = title;

  /**
   * @type Element
   * @private
   */
  this._DOMElement = document.createElement('div');
  this._DOMElement.className = 'sdialog';

  /**
   * @type Element
   * @private
   */
  this._header = document.createElement('header');
  var h2 = document.createElement('h2');
  h2.appendChild(document.createTextNode(title));
  this._header.appendChild(h2);
  this._header.appendChild(sDialog.makeCloseButton());
  this._DOMElement.appendChild(this._header);

  /**
   * @type (Element|null)
   * @private
   */
  this._form = null;

  /**
   * @type Array
   * @private
   */
  this._buttons = [];

  /**
   * @type Element
   * @private
   */
  this._buttonsContainer = document.createElement('div');
  this._buttonsContainer.className = 'sdialog-button-container';

  /**
   * @type boolean
   * @private
   */
  this._centered = true;

  return this;
};
/**
 * @private
 * @returns {Element}
 */
sDialog.makeCloseButton = function () {
  var close = document.createElement('a');
  close.className = 'close-button-x';
  close.setAttribute('href', '#');
  close.innerHTML = 'X';

  q(close).bind('click', function (event) {
    sHistory.removeState('dialog');
    event.preventDefault();
    return false;
  });

  return close;
};
/**
 * @type sView
 * @private
 */
sDialog.prototype = new sView();
sDialog.prototype.parent = sView.prototype;
sDialog.prototype.constructor = sDialog;
/**
 * Set the form for this dialog. A dialog can only have one form.
 * @param {sForm} form Form object.
 * @returns {sDialog} The object to allow method chaining.
 */
sDialog.prototype.setForm = function (form) {
  this._DOMElement.innerHTML = '';
  this._DOMElement.appendChild(this._header);
  form.appendTo(this._DOMElement);
  this._form = form;
  return this;
};
/**
 * Get the form for this dialog.
 * @returns {sForm|null} The form object or null if one has not been set.
 */
sDialog.prototype.getForm = function () {
  return this._form;
};
/**
 * Set the buttons for this form.
 * @param {Array} buttons Set of DOM Elements of submit button type.
 * @returns {sDialog} The object to allow method chaining.
 */
sDialog.prototype.setButtons = function (buttons) {
  this._buttons = [];
  return this;
};
/**
 * Set the title for this dialog.
 * @param {string} title The title of the dialog.
 * @returns {sDialog} The object to allow method chaining.
 */
sDialog.prototype.setTitle = function (title) {
  this._title = title;
  this._header.innerHTML = '';
  var h2 = document.createElement('h2');
  h2.appendChild(document.createTextNode(title));
  this._header.appendChild(h2);
  this._header.appendChild(sDialog.makeCloseButton());
  return this;
};
/**
 * Get the title of the dialog.
 * @returns {string} The title.
 */
sDialog.prototype.getTitle = function () {
  return this._title;
};
/**
 * Set the main element's <code>id</code> attribute.
 * @param {string} id The ID to set.
 * @returns {sDialog} The object to allow method chaining.
 */
sDialog.prototype.setId = function (id) {
  this._DOMElement.setAttribute('id', id);
  return this;
};
/**
 * Hide the dialog. This adds a class <code>sdialog-hidden</code> to the
 *   element.
 * @returns {sDialog} The object to allow method chaining.
 */
sDialog.prototype.hide = function () {
  sOverlayView.getInstance().hide();
  this._DOMElement.className += ' sdialog-hidden';
  return this;
};
/**
 * Show the dialog. This removes the class <code>sdialog-hidden</code> from
 *   the main element.
 * @returns {sDialog} The object to allow method chaining.
 */
sDialog.prototype.show = function () {
  sOverlayView.getInstance().show();
  this._DOMElement.className = this._DOMElement.className.replace(/(\s+)?sdialog\-hidden/g, '');
  return this;
};
/**
 * Add a button.
 * @param {string} label Label text for the button.
 * @param {sForm} formToSubmit The form that this button will submit.
 * @returns {sDialog} The object to allow method chaining.
 */
sDialog.prototype.addButton = function (label, formToSubmit) {
  var button = document.createElement('input');
  button.setAttribute('type', 'submit');
  button.setAttribute('value', label);
  button.className = 'form-submit';

  q(button).bind('click', function (event) {
    formToSubmit.getDOMElement().submit();
  });

  this._buttons.push(button);

  return this;
};
/**
 * Append the dialog to the element specified.
 * @param {Element} element Element to append to.
 * @returns {sDialog} The object to allow method chaining.
 */
sDialog.prototype.appendTo = function (element) {
  var addEvent = !this.isAppended() && this._centered;

  this.parent.appendTo.call(this, element);

  for (var i = 0; i < this._buttons.length; i++) {
    this._buttonsContainer.appendChild(this._buttons[i]);
  }

  this._DOMElement.appendChild(this._buttonsContainer);

  if (addEvent) {
    element = this._DOMElement;
    var resize = function () {
      var height = sWin.getHeight() / 2;
      var width = sWin.getWidth() / 2;
      var x = parseInt(width - (element.offsetWidth / 2), 10);
      var y = parseInt(height - (element.offsetHeight / 2), 10);

      if (sCSS.hasTransforms) {
        sCSS.translate(element, x, y);
      }
      else {
        element.style.left = x + 'px';
        element.style.top = y + 'px';
      }
    };
    resize();
    sWin.bind('resize', resize, false);
  }

  return this;
};
/**
 * Set the width of the main element.
 * @param {number} width The width to set.
 * @param {string} [unit=px] The unit to use.
 * @returns {sDialog} The object to allow method chaining.
 */
sDialog.prototype.setWidth = function (width, unit) {
  if (unit === undefined) {
    unit = 'px';
  }
  this._DOMElement.style.width = width + unit;
  return this;
};

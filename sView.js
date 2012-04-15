/**
 * Base view class. All views inherit from this class.
 * @constructor
 * @returns {sView} The view object.
 */
var sView = function () {
  /**
   * @type (Element|null)
   * @private
   */
  this._DOMElement = null;
  /**
   * @type boolean
   * @private
   */
  this._isAppended = false;
  /**
   * @type boolean
   * @private
   */
  this._rendered = false;
  /**
   * @type Object
   * @private
   */
  this._subViews = {};

  return this;
};
/**
 * Set the DOM element. Resets render state.
 * @param {Element} element Element to set as this DOM element.
 * @returns {sView} The object to allow method chaining.
 */
sView.prototype.setDOMElement = function (element) {
  this._DOMElement = element;
  this._rendered = false;
  return this;
};
/**
 * Get the DOM element.
 * @returns {Element} The DOM element.
 */
sView.prototype.getDOMElement = function () {
  return this._DOMElement;
};
/**
 * If the DOM element is appended.
 * @returns {boolean} If the DOM element is appended.
 */
sView.prototype.isAppended = function () {
  return this._isAppended;
};
/**
 * Set if the DOM element is appended.
 *
 * @returns {sView} The object to allow method chaining.
 */
sView.prototype.setAppended = function (bool) {
  this._isAppended = bool ? true : false;
  return this;
};
/**
 * Appends the main element to the element specified.
 * @param {Element} element The element to append to.
 * @param {boolean} [forceRerender=false] Force re-rendering.
 * @returns {sView} The object to allow method chaining.
 */
sView.prototype.appendTo = function (element, forceRerender) {
  if (forceRerender) {
    this.render(true);
  }
  this._isAppended = true;
  this._rendered = true;
  element.appendChild(this._DOMElement);
  return this;
};
/**
 * Set the rendered state of this view.
 * @param {boolean} bool The value to set. True or false.
 * @returns {sView} The object to allow method chaining.
 */
sView.prototype.setRendered = function (bool) {
  this._rendered = bool ? true : false;
  return this;
};
/**
 * If the view is rendered.
 * @returns {boolean} If the view is rendered.
 */
sView.prototype.isRendered = function () {
  return this._rendered;
};
/**
 * Prepend the view to the element specified.
 * @param {Element} element The element to prepend to.
 * @returns {sView} The object to allow method chaining.
 */
sView.prototype.prependTo = function (element) {
  this._isAppended = true;
  this._rendered = true;
  element.insertBefore(this._DOMElement, element.firstChild);
  return this;
};
/**
 * Insert the element after the specified ID.
 * @param {string} id ID to search for.
 * @returns {sView} The object to allow method chaining.
 */
sView.prototype.insertAfterId = function (id) {
  var element = document.getElementById(id);

  if (element !== null) {
    if (element.nextSibling) {
      element.parentNode.insertBefore(this._DOMElement, element.nextSibling);
    }
    else {
      element.parentNode.appendChild(this._DOMElement);
    }
  }

  return this;
};
/**
 * Add a custom view. The view is expected to extend off sView.
 * @param {sView} view An sView instance or subclass of sView instance.
 * @param {string} [name] Name of the view for later retrieval.
 * @return {sView} The object to allow method chaining.
 */
sView.prototype.addCustomView = function (view, name) {
  if (!this._DOMElement) {
    return this;
  }

  if (name) {
    this._subViews[name] = view;
  }

  this._DOMElement.appendChild(view.getDOMElement());

  return this;
};
/**
 * Get a custom view by its name assigned.
 * @param {string} name Name of the view.
 * @returns {sView|null} The sView instance of <code>null</code>.
 */
sView.prototype.getViewByName = function (name) {
  if (this._subViews[name] === undefined) {
    return null;
  }
  return this._subViews[name];
};

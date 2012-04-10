/**
 * Represents a button at the bottom of an sDataList for loading more content
 *   (advancing to the next page).
 * @param {string} [text] The text for the button.
 * @returns {sDataListLoadMoreItemsView} The object.
 * @constructor
 */
var sDataListLoadMoreItemsView = function (text) {
  this.parent.constructor.call(this);

  /**
   * @type string
   * @private
   */
  this._text = text || 'Load more';

  /**
   * @type Element
   * @private
   */
  this._DOMElement = sDoc.newElement('li');

  /**
   * @type (sDataList|null)
   * @private
   */
  this._controlledList = null;

  /**
   * @type Element
   * @private
   */
  this._buttonElement = sDoc.newElement('a');

  /**
   * @type Object
   * @private
   */
  this._data = {};

  /**
   * @type boolean
   * @private
   */
  this._eventAttached = false;

  this.render();

  return this;
};
/**
 * @type sDataListItem
 * @private
 */
sDataListLoadMoreItemsView.prototype = new sDataListItem({});
sDataListLoadMoreItemsView.prototype.parent = sDataListItem.prototype;
/**
 * Set the sDataList instance that this button controls.
 * @param {sDataList} list The list.
 * @returns {sDataListLoadMoreItemsView} The object to allow method chaining.
 */
sDataListLoadMoreItemsView.prototype.setControlledList = function (list) {
  this._controlledList = list;
  return this;
};
/**
 * Renders the view.
 * @param {boolean} force Force re-rendering.
 * @returns {sDataListLoadMoreItemsView} The object to allow method chaining.
 */
sDataListLoadMoreItemsView.prototype.render = function (force) {
  if (!this.isRendered() || force) {
    this._buttonElement.setAttribute('role', 'button');
    this._buttonElement.setAttribute('href', '#');

    if (!this._eventAttached) {
      var instance = this;
      q(this._buttonElement).setText(this._text).addClass('sdata-list-item-load-more').bind('click', function (event) {
        if (instance._controlledList) {
          instance._controlledList.appendNextPage();
        }
        event.preventDefault();
        return false;
      });
      this._eventAttached = true;
    }

    this._DOMElement.className = 'sdata-list-load-more-container';
    this._DOMElement.appendChild(this._buttonElement);

    this.setRendered(true);
  }
  return this;
};

/**
 * Represents one item in a sDataList object.
 * @constructor
 * @param {Object} data Object of data.
 * @returns {sDataListItem} The list item.
 */
var sDataListItem = function (data) {
  //this.parent.constructor.call(this);

  /**
   * @private
   * @type Object
   */
  this._data = data;
  /**
   * @private
   * @type Element
   */
  this._DOMElement = sDoc.newElement('li');

  return this;
};
/**
 * @type sView
 * @private
 */
sDataListItem.prototype = new sView();
// /**
//  * @type sView.prototype
//  * @private
//  */
// sDataListItem.prototype.parent = sView.prototype;
// TODO Fix warning
// /**
//  * @type function()
//  * @private
//  */
sDataListItem.prototype.constructor = sDataListItem;
/**
 * @param {Element} element The element to append to.
 * @returns {sDataListItem} The object to allow method chaining.
 */
sDataListItem.prototype.appendTo = function (element) {
  element.appendChild(this._DOMElement);
  return this;
};

/**
 * Represents one item in a sDataList.
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
/**
 * @type function()
 * @private
 */
sDataListItem.prototype.constructor = sDataListItem;
/**
 * @type {Element} element
 * @returns {sDataListItem}
 */
sDataListItem.prototype.appendTo = function (element) {
  element.appendChild(this._DOMElement);
  return this;
};

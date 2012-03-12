/**
 * This class is not intended for general usage. It is intended for
 *   extension.
 * When extending, before sure to override the decodeDataToItems() method.
 * @see sDataList#decodeDataToItems
 * @constructor
 * @returns {sDataList} The object.
 */
var sDataList = function () {
  /**
   * @private
   * @type (string|null)
   */
  this._dataSourceURI = null;
  /**
   * @private
   * @type Array
   */
  this._data = [];
  /**
   * @private
   * @type number
   */
  this._pageNumber = 1;
  /**
   * @private
   * @type number
   */
  this._limitPerRequest = 20;
  /**
   * @private
   * @type string
   */
  this._pageParameter = 'page';
  /**
   * @private
   * @type string
   */
  this._limitParameter = 'limit';
  /**
   * @private
   * @type Element
   */
  this._DOMElement = sDoc.newElement('ul');
  /**
   * @private
   * @type boolean
   */
  this._rendered = false;

  return this;
};
/**
 * @type sView
 * @private
 */
sDataList.prototype = new sView();
/**
 * Set the data source.
 * @param {string} url URL to the data source, relative or full.
 * @returns {sDataList} The data list object to allow method chaining.
 */
sDataList.prototype.setDataSourceURI = function (url) {
  this._dataSourceURI = url;
  return this;
};
/**
 * Set the page parameter.
 * @param {string} param The parameter name to use to name the page number
 *   in each request.
 * @return {sDataList} The data list object to allow method chaining.
 */
sDataList.prototype.setDataSourceURIPageParameter = function (param) {
  this._pageParameter = param;
  return this;
};
/**
 * Set the limit parameter.
 * @param {string} param The parameter name to use to limit the count of items
 *   received in each request.
 * @return {sDataList} The data list object to allow method chaining.
 */
sDataList.prototype.setDataSourceURILimitParameter = function (param) {
  this._limitParameter = param;
  return this;
};
/**
 * Reloads the data from the source with typical AJAX.
 * @returns {sDataList} The data list object to allow method chaining.
 */
sDataList.prototype.reloadData = function () {
  return this;
};
/**
 * This is called when the XHR is complete and succeeds. Must return an array
 *   of sDataListItem objects.
 * @param {string} data String of data retrieved from the request.
 * @returns {Array} Array of sDataListItem objects.
 */
sDataList.prototype.decodeDataToItems = function (data) {
  return [];
};
/**
 * Set the limit of items per request.
 * @param {number} limit Limit.
 * @returns {sDataList} The data list object to allow method chaining.
 */
sDataList.prototype.setLimitPerRequest = function (limit) {
  this._limitPerRequest = parseInt(limit, 10);
  return this;
};
/**
 * Gets the number of items per request.
 * @returns {number} Number of items per request.
 */
sDataList.prototype.getLimitPerRequest = function () {
  return this._limitPerRequest;
};
/**
 * Set the page number.
 * @param {number} page Page number.
 * @returns {sDataList} The data list object to allow method chaining.
 */
sDataList.prototype.setPageNumber = function (page) {
  this._pageNumber = page;
  return this;
};
/**
 * Set the data. It may be desirable to re-render after calling this.
 * @param {Array} data The data to set.
 * @returns {sDataList} The data list object to allow method chaining.
 */
sDataList.prototype.setData = function (data) {
  this._data = data;
  return this;
};
/**
 * Renders the data. When implementing, be sure to call setRendered with true
 *   when rendering is complete.
 * @param {boolean} force Force a re-load of the data.
 * @returns {sDataList} The data list object to allow method chaining.
 */
sDataList.prototype.render = function (force) {
  if (!this._rendered || force) {
    this._rendered = true;
  }
  return this;
};
/**
 * Returns if rendered.
 * @returns {boolean} If the list is already rendered.
 */
sDataList.prototype.isRendered = function () {
  return this._rendered;
};
/**
 * Set rendered state.
 * @param {boolean} state True or false.
 * @returns {sDataList} The data list object to allow method chaining.
 */
sDataList.prototype.setRendered = function (state) {
  this._rendered = state ? true : false;
  return this;
};
/**
 * Gets the data.
 * @returns {Array} The data last retrieived, or empty array.
 */
sDataList.prototype.getData = function () {
  return this._data;
};

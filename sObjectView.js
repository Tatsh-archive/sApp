/**
 * Used for representing &lt;object&gt; elements.
 * @constructor
 * @param {Object} [attributes] Attributes object.
 * @param {Object} [params] Parameter key-value pairs to add.
 * @returns {sObjectView} The view object.
 * @augments {sView}
 */
var sObjectView = function (attributes, params) {
  this.parent.constructor.call(this);

  this._DOMElement = sDoc.newElement('object');

  if (attributes) {
    q(this._DOMElement).setAttributes(attributes);
  }

  var el;
  var qdom = q(this._DOMElement);

  if (params) {
    for (var name in params) {
      if (params.hasOwnProperty(name)) {
        el = q(sDoc.newElement('param')).setAttributes({'name': name, 'value': params[name]});
        qdom.append(el);
      }
    }
  }

  return this;
};
sObjectView.prototype = new sView();
sObjectView.prototype.parent = sView.prototype;

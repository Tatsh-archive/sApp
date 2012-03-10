var sImage = function (src, alt) {
  this.parent.constructor.call(this);

  if (alt === undefined) {
    alt = '';
  }

  this._alt = alt;
  this._title = '';
  this._DOMElement = document.createElement('img');
  this._DOMElement.setAttribute('src', src);
  this._DOMElement.setAttribute('alt', this._alt);

  this._onloadHandler = function () {};

  return this;
};
sImage.prototype = new sView();
sImage.prototype.parent = sView.prototype;
sImage.prototype.setSource = function (src, onloadHandler) {
  var sel = q(this._DOMElement);

  if (onloadHandler !== undefined) {
    sel.unbind('load', this._onloadHandler);
    this._onloadHandler = onloadHandler;
  }
  else {
    this._onloadHandler = function () {};
  }

  if (this.isAppended()) {
    sel.bind('load', this._onloadHandler).setAttributes({'src': src});
    return this;
  }

  this._DOMElement = document.createElement('img');
  this._DOMElement.setAttribute('src', src);
  this._DOMElement.setAttribute('alt', this._alt);
  return this;
};
sImage.prototype.setAlt = function (alt) {
  this._alt = alt;
  this._DOMElement.setAttribute('alt', alt);
  return this;
};
sImage.prototype.setTitle = function (title) {

};

/**
 * @constructor
 */
var sForm = function () {
  this.parent.constructor.call(this);
  this._DOMElement = document.createElement('form');
  this._DOMElement.className = 'sform';

  this._fields = [];
  this._submithandlers = [];
  this._usesDefaultEvent = true;

  var instance = this;
  q(this._DOMElement).bind('submit', function (event) {
    var fns = this.getSubmitHandlers();
    for (var i = 0; i < fns.length; i++) {
      if (!fns[i](instance)) {
        event.preventDefault();
        return false;
      }
    }

    if (!instance.usesDefaultEvent()) {
      event.preventDefault();
      return false;
    }
  });

  return this;
};
sForm.prototype = new sView();
sForm.prototype.parent = sView.prototype;
sForm.prototype.addField = function (field) {
  this._fields.push(field);
  return this;
};
sForm.prototype.addSubmitHandler = function (fn) {
  this._submithandlers.push(fn);
  return this;
};
sForm.prototype.getSubmitHandlers = function () {
  return this._submithandlers;
};
sForm.prototype.usesDefaultEvent = function () {
  return this._usesDefaultEvent;
};
sForm.prototype.setUsesDefaultEvent = function (bool) {
  this._usesDefaultEvent = bool ? true : false;
  return this;
};
sForm.prototype.addFields = function (arr) {
  for (var i = 0; i < arr.length; i++) {
    this._fields.push(arr[i]);
  }
  return this;
};
sForm.prototype.appendTo = function (element) {
  this._isAppended = true;

  for (var i = 0; i < this._fields.length; i++) {
    this._fields[i].appendTo(this._DOMElement);
  }

  element.appendChild(this._DOMElement);

  return this;
};
sForm.prototype.setMethod = function (method) {
  this._DOMElement.method = method.toLowerCase();
  return this;
};
sForm.prototype.setAction = function (action) {
  this._DOMElement.action = action;
  return this;
};

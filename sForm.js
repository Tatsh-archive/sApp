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

  this._buttons = [];
  this._buttonsDOMElement = document.createElement('div');
  this._buttonsDOMElement.className = 'form-ops-container';

  var instance = this;
  q(this._DOMElement).bind('submit', function (event) {
    var fns = instance.getSubmitHandlers();
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
sForm.prototype._pendCommon = function () {
  this._isAppended = true;

  for (var i = 0; i < this._fields.length; i++) {
    this._fields[i].appendTo(this._DOMElement);
  }

  for (i = 0; i < this._buttons.length; i++) {
    this._buttonsDOMElement.appendChild(this._buttons[i]);
  }
  this._DOMElement.appendChild(this._buttonsDOMElement);
};
sForm.prototype.appendTo = function (element) {
  this._pendCommon();
  return this.parent.appendTo.call(this, element);
};
sForm.prototype.setMethod = function (method) {
  this._DOMElement.method = method.toLowerCase();
  return this;
};
sForm.prototype.setAction = function (action) {
  this._DOMElement.action = action;
  return this;
};
sForm.prototype.addButton = function (value) {
  var button = document.createElement('input');
  button.className = 'form-submit';
  button.setAttribute('name', 'op');
  button.setAttribute('type', 'submit');
  button.setAttribute('value', value);

  this._buttons.push(button);

  return this;
};
sForm.prototype.prependTo = function (element) {
  this._pendCommon();
  return this.parent.prependTo.call(this, element);
};
sForm.prototype.insertAfterId = function (id) {
  this._pendCommon();
  return this.parent.insertAfterId.call(this, id);
};

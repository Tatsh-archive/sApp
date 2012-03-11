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

  this._CSRFDOMElement = document.createElement('input');
  this._CSRFDOMElement.setAttribute('type', 'hidden');
  this._CSRFDOMElement.setAttribute('name', 'csrf');
  this._CSRFDOMElement.value = '';

  var instance = this;
  q(this._DOMElement).bind('submit', function (event) {
    var fns = instance.getSubmitHandlers();
    var ret = true;

    for (var i = 0; i < fns.length; i++) {
      if (!fns[i](instance)) {
        ret = false;
      }
    }

    if (!instance.usesDefaultEvent() || !ret) {
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
  this._DOMElement.appendChild(this._CSRFDOMElement);
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
sForm.prototype.disable = function () {
  var form = this._DOMElement;
  var inputs = form.getElementsByTagName('input');
  var textareas = form.getElementsByTagName('textarea');

  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].getAttribute('type').toLowerCase() !== 'hidden') {
      inputs[i].setAttribute('disabled', 'disabled');
    }
  }

  for (i = 0; i < textareas.length; i++) {
    textareas[i].setAttribute('disabled', 'disabled');
  }

  return this;
};
sForm.prototype.enable = function () {
  var form = this._DOMElement;
  var inputs = form.getElementsByTagName('input');
  var textareas = form.getElementsByTagName('textarea');

  for (var i = 0; i < inputs.length; i++) {
    inputs[i].removeAttribute('disabled');
  }

  for (i = 0; i < textareas.length; i++) {
    textareas[i].removeAttribute('disabled');
  }

  return this;
};
sForm.prototype.submitByAJAX = function (cb, errorCb, dataType, isFileUpload) {
  var postData = {};

  // Find anything with a value
  var form = this._DOMElement;
  var inputs = form.getElementsByTagName('input');
  var textareas = form.getElementsByTagName('textarea');
  var type;
  var name;

  for (var i = 0; i < inputs.length; i++) {
    type = inputs[i].getAttribute('type').toLowerCase();
    name = inputs[i].getAttribute('name');

    if (name) {
      if (type === 'checkbox' || type === 'radio') {
        if (inputs[i].checked) {
          postData[name] = inputs[i].value;
        }
      }
      else {
        postData[name] = inputs[i].value;
      }
    }
  }

  for (i = 0; i < textareas.length; i++) {
    name = textareas[i].getAttribute('name');

    if (name) {
      postData[name] = textareas[i].value;
    }
  }

  sAJAXRequest.post(this._DOMElement.action, postData, cb, errorCb, dataType, isFileUpload);

  return this;
};
sForm.prototype.reset = function () {
  this._DOMElement.reset();
  return this;
};
sForm.prototype.setCSRF = function (csrf) {
  this._CSRFDOMElement.value = csrf;
  return this;
};

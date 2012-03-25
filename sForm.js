/**
 * Represents a form.
 * @constructor
 * @returns {sForm} The form object.
 * @augments sView
 */
var sForm = function () {
  this.parent.constructor.call(this);

  /**
   * @type Element
   * @private
   */
  this._DOMElement = document.createElement('form');
  this._DOMElement.className = 'sform';

  /**
   * @type Array
   * @private
   */
  this._fields = [];
  /**
   * @type Array
   * @private
   */
  this._submithandlers = [];
  /**
   * @type boolean
   * @private
   */
  this._usesDefaultEvent = true;

  /**
   * @type Array
   * @private
   */
  this._buttons = [];

  /**
   * @type Element
   * @private
   */
  this._buttonsDOMElement = document.createElement('div');
  this._buttonsDOMElement.className = 'form-ops-container';

  /**
   * @type Element
   * @private
   */
  this._CSRFDOMElement = document.createElement('input');
  this._CSRFDOMElement.setAttribute('type', 'hidden');
  this._CSRFDOMElement.setAttribute('name', 'csrf');
  this._CSRFDOMElement.value = '';

  /**
   * @type sForm
   * @private
   */
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
/**
 * @type sView
 * @private
 */
sForm.prototype = new sView();
sForm.prototype.parent = sView.prototype;
/**
 * Add a field.
 * @param {sTextAreaField|sPasswordField|sTextField} field The field to add.
 * @returns {sForm} The object to allow method chaining.
 */
sForm.prototype.addField = function (field) {
  this._fields.push(field);
  return this;
};
/**
 * Add a submit handler.
 * @param {function(sForm)} fn The function to call on submit.
 * @returns {sForm} The object to allow method chaining.
 */
sForm.prototype.addSubmitHandler = function (fn) {
  this._submithandlers.push(fn);
  return this;
};
/**
 * Get the submit handlers.
 * @returns {Array} Array of submit handler functions.
 */
sForm.prototype.getSubmitHandlers = function () {
  return this._submithandlers;
};
/**
 * If the form uses the default event.
 * @returns {boolean} If the form uses the default event.
 */
sForm.prototype.usesDefaultEvent = function () {
  return this._usesDefaultEvent;
};
/**
 * Set whether or not the form uses the default event.
 * @param {boolean} bool True or false.
 * @returns {sForm} The object to allow method chaining.
 */
sForm.prototype.setUsesDefaultEvent = function (bool) {
  this._usesDefaultEvent = bool ? true : false;
  return this;
};
/**
 * Add an array of fields to the form.
 * @param {Array} arr Array of valid field objects.
 * @returns {sForm} The object to allow method chaining.
 */
sForm.prototype.addFields = function (arr) {
  for (var i = 0; i < arr.length; i++) {
    this._fields.push(arr[i]);
  }
  return this;
};
/**
 * @private
 */
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
/**
 * Appends the form to the element specified.
 * @param {Element} element The element to append to.
 * @returns {sForm} The object to allow method chaining.
 */
sForm.prototype.appendTo = function (element) {
  this._pendCommon();
  return this.parent.appendTo.call(this, element);
};
/**
 * Set the HTTP method of the form.
 * @param {string} method One of: 'get', 'post', 'put', 'delete'.
 * @returns {sForm} The object to allow method chaining.
 */
sForm.prototype.setMethod = function (method) {
  this._DOMElement.method = method.toLowerCase();
  return this;
};
/**
 * Set the action URL of the form.
 * @param {string} action A valid URL.
 * @returns {sForm} The object to allow method chaining.
 */
sForm.prototype.setAction = function (action) {
  this._DOMElement.action = action;
  return this;
};
/**
 * Add a button to the form.
 * @param {string} value The label text for the button.
 * @returns {sForm} The object to allow method chaining.
 */
sForm.prototype.addButton = function (value) {
  var button = document.createElement('input');
  button.className = 'form-submit';
  button.setAttribute('name', 'op');
  button.setAttribute('type', 'submit');
  button.setAttribute('value', value);

  this._buttons.push(button);

  return this;
};
/**
 * Prepends the form to the element specified.
 * @param {Element} element Element to prepend to.
 * @returns {sForm} The object to allow method chaining.
 */
sForm.prototype.prependTo = function (element) {
  this._pendCommon();
  return this.parent.prependTo.call(this, element);
};
/**
 * Adds the form after the element with specified ID.
 * @param {string} id The ID to find.
 * @returns {sForm} The object to allow method chaining.
 */
sForm.prototype.insertAfterId = function (id) {
  this._pendCommon();
  return this.parent.insertAfterId.call(this, id);
};
/**
 * Disables all fields in the form.
 * @returns {sForm} The object to allow method chaining.
 */
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
/**
 * Enables all fields in the form.
 * @returns {sForm} The object to allow method chaining.
 */
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
/**
 * Submits the form via AJAX.
 * @param {function()} cb The callback for success.
 * @param {function()} [errorCb] The callback on error.
 * @param {string} [dataType] The data type.
 * @param {boolean} [isFileUpload] If the form submission is for a file upload.
 * @returns {sForm} The object to allow method chaining.
 */
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
/**
 * Resets the form.
 * @returns {sForm} The object to allow method chaining.
 */
sForm.prototype.reset = function () {
  this._DOMElement.reset();
  return this;
};
/**
 * Sets the CSRF value of the form.
 * @param {string} csrf The CSRF token value.
 * @returns {sForm} The object to allow method chaining.
 */
sForm.prototype.setCSRF = function (csrf) {
  this._CSRFDOMElement.value = csrf;
  return this;
};
/**
 * Get a value of a field on this form.
 * @param {string} name The name.
 * @returns {string} The value of the field.
 */
sForm.prototype.getValue = function (name) {
  return this._DOMElement.elements[name];
};

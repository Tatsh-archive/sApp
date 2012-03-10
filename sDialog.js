/**
 * @constructor
 * @param {string} title
 */
var sDialog = function (title) {
  this.parent.constructor.call(this);

  this._title = title;
  this._DOMElement = document.createElement('div');
  this._DOMElement.className = 'sdialog';

  this._header = document.createElement('header');
  var h2 = document.createElement('h2');
  h2.appendChild(document.createTextNode(title));
  this._header.appendChild(h2);
  this._header.appendChild(sDialog.makeCloseButton());
  this._DOMElement.appendChild(this._header);

  this._form = null;

  this._buttons = [];
  this._buttonsContainer = document.createElement('div');
  this._buttonsContainer.className = 'sdialog-button-container';

  this._centered = true;

  return this;
};
sDialog.makeCloseButton = function () {
  var close = document.createElement('a');
  close.className = 'close-button-x';
  close.setAttribute('href', '#');
  close.innerHTML = 'X';

  q(close).bind('click', function (event) {
    sHistory.removeState('dialog');
    event.preventDefault();
    return false;
  });

  return close;
};
sDialog.prototype = new sView();
sDialog.prototype.parent = sView.prototype;
sDialog.prototype.constructor = sDialog;
sDialog.prototype.setForm = function (form) {
  this._DOMElement.innerHTML = '';
  this._DOMElement.appendChild(this._header);
  form.appendTo(this._DOMElement);
  this._form = form;
  return this;
};
sDialog.prototype.getForm = function () {
  return this._form;
};
sDialog.prototype.setButtons = function (buttons) {
  this._buttons = [];
  return this;
};
sDialog.prototype.setTitle = function (title) {
  this._title = title;
  this._header.innerHTML = '';
  var h2 = document.createElement('h2');
  h2.appendChild(document.createTextNode(title));
  this._header.appendChild(h2);
  this._header.appendChild(sDialog.makeCloseButton());
  return this;
};
sDialog.prototype.getTitle = function () {
  return this._title;
};
sDialog.prototype.setId = function (id) {
  this._DOMElement.setAttribute('id', id);
  return this;
};
sDialog.prototype.hide = function () {
  this._DOMElement.className += ' sdialog-hidden';;
  return this;
};
sDialog.prototype.show = function () {
  this._DOMElement.className = this._DOMElement.className.replace(/(\s+)?sdialog\-hidden/g, '');
  return this;
};
sDialog.prototype.addButton = function (label, formToSubmit) {
  var button = document.createElement('input');
  button.setAttribute('type', 'submit');
  button.setAttribute('value', label);
  button.className = 'form-submit';

  q(button).bind('click', function (event) {
    formToSubmit.getDOMElement().submit();
  });

  this._buttons.push(button);

  return this;
};
sDialog.prototype.appendTo = function (element) {
  var addEvent = !this.isAppended() && this._centered;

  this.parent.appendTo.call(this, element);

  for (var i = 0; i < this._buttons.length; i++) {
    this._buttonsContainer.appendChild(this._buttons[i]);
  }

  this._DOMElement.appendChild(this._buttonsContainer);

  if (addEvent) {
    var element = this._DOMElement;
    var resize = function () {
      var height = sWin.getHeight() / 2;
      var width = sWin.getWidth() / 2;
      var x = parseInt(width - (element.offsetWidth / 2), 10);
      var y = parseInt(height - (element.offsetHeight / 2), 10);

      if (sCSS.hasTransforms) {
        sCSS.translate(element, x, y);
      }
      else {
        element.style.left = x + 'px';
        element.style.top = y + 'px';
      }
    };
    resize();
    sWin.bind('resize', resize, false);
  }

  return this;
};
sDialog.prototype.setWidth = function (width, unit) {
  if (unit === undefined) {
    unit = 'px';
  }
  this._DOMElement.style.width = width + unit;
  return this;
};

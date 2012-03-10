/**
 * @constructor
 */
var sApplication = function (title) {
  this._title = title;
  this._dialogs = {};

  // Bind dialog handling
  var app = this;
  sHistory.addEventListener(function () {

    var dialog = sHistory.getState('dialog');
    for (var key in app._dialogs) {
      if (app._dialogs.hasOwnProperty(key)) {
        app._dialogs[key].hide();
      }
    }

    if (dialog !== null && app._dialogs[dialog] !== undefined) {
      app._dialogs[dialog].show();
    }
  });

  this._started = false;

  sApplication._apps[title] = this;

  return this;
};
sApplication._apps = {};
sApplication.prototype.getTitle = function () {
  return this._title;
};
sApplication.prototype.setTitle = function (title) {
  this._title = title;
  return this;
};
sApplication.prototype.registerDialog = function (stateName, dialog) {
  this._dialogs[stateName] = dialog;
  return this;
};
sApplication.prototype.getDialogByName = function (name) {
  if (this._dialogs[name] !== undefined) {
    return this._dialogs[name];
  }
  return null;
};
sApplication.prototype.main = function () {
  if (!this._started) {
    sHistory.start();
    this._started = true;
  }
  return this;
};
sApplication.prototype.addStateListener = function (key, func) {
  sHistory.addEventListener(function () {
    if ((value = sHistory.getState(key)) !== null) {
      func(value);
    }
  });
};

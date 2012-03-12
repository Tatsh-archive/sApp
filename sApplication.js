/**
 * Application.
 * @param {string} title Title of the application.
 * @returns {sApplication} The application object.
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
/**
 * Registered applications.
 * @type Object
 * @private
 */
sApplication._apps = {};
/**
 * Get the title of this application.
 * @returns {string} The title.
 */
sApplication.prototype.getTitle = function () {
  return this._title;
};
/**
 * Set the title of this application.
 * @param {string} title The title to set.
 * @returns {sApplication} The object to allow method chaining.
 */
sApplication.prototype.setTitle = function (title) {
  this._title = title;
  return this;
};
/**
 * Register a dialog that will be invoked when a the state 'dialog' (in the
 *   hash) is equal to the <code>stateName</code> specified here.
 * @param {string} stateName The state value to match.
 * @param {sDialog} dialog The dialog to display.
 * @returns {sApplication} The object to allow method chaining.
 */
sApplication.prototype.registerDialog = function (stateName, dialog) {
  this._dialogs[stateName] = dialog;
  return this;
};
/**
 * Get a dialog by its name (state value).
 * @param {string} name The name.
 * @returns {sDialog|null} The dialog object, or null if the object does not
 *   exist.
 */
sApplication.prototype.getDialogByName = function (name) {
  if (this._dialogs[name] !== undefined) {
    return this._dialogs[name];
  }
  return null;
};
/**
 * Begin the application. This just calls <code>sHistory.start()</code> if it
 *   has not been started yet.
 * @returns {sApplication} The object to allow method chaining.
 * @see sHistory#start
 */
sApplication.prototype.main = function () {
  if (!this._started) {
    sHistory.start();
    this._started = true;
  }
  return this;
};
/**
 * States listening to.
 * @type Object
 * @private
 */
sApplication._statesListeningOn = {};
/**
 * Add a state listener on a particular key.
 * @param {string} key Key to listen for.
 * @param {function((string|number|boolean))} func The function called each
 *   time this key changes.
 * @param {string} [type='string'] The type of the value. One of: 'string',
 *   'boolean', 'float', 'number.
 * @returns {sApplication} The object to allow method chaining.
 */
sApplication.prototype.addStateListener = function (key, func, type) {
  sApplication._statesListeningOn[key] = null;

  if (type === undefined) {
    type = 'string';
  }

  sHistory.addEventListener(function () {
    var value = sHistory.getState(key, type);
    var lastState = sApplication._statesListeningOn[key];

    if (type.substr(0, 4) === 'bool' || type === 'number' || type === 'float') {
      // 0 and false are acceptable responses in this case
      if (value !== lastState) {
        func(value);
      }
    }
    else if (value && value !== lastState) {
      func(value);
    }

    sApplication._statesListeningOn[key] = value;
  });
  return this;
};

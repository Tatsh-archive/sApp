var sApplication = function (title) {
  this._title = title;
  this._views = [];
  return this;
};
sApplication.prototype.getTitle = function () {
  return this._title;
};
sApplication.prototype.setTitle = function (title) {
  this._title = title;
  return this;
};
sApplication.prototype.addView = function (view) {
  this._views.push(view);
};

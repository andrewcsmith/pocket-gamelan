$(document).bind('mobileinit', function() {
  $.mobile.loader.prototype.options.textVisible = false;
  $.mobile.ajaxEnabled = false;
  // hide the default jquery mobile loader
});

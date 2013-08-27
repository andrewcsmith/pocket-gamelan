//= require "./vendor/jquery-1.10.2.min.js"

$(document).bind('mobileinit', function() {
  // $.mobile.loader.prototype.options.textVisible = false;
  // hide the default jquery mobile loader
  $.mobile.loading("hide");
});

//= require "./vendor/jquery.mobile-1.3.2.min.js"

//= require './elements/function.js.coffee'

var moveToAnchor = function(e) {
  if ($(this).is("div")) {
    var hash = $(this).attr("id");
    var el = $(this);
  } else {
    // Should be called by a link object
    var hash = this.href.match(/#.*$/);
    // console.log(hash);
    // console.log($(".island" + hash));
    var el = $(hash + ""); // jQuery object of the element
  }
  // el should be a jQuery object of the element to move to
  moveTo(el);
  // Change the hash of the current url
  document.location.hash = hash;
  
  return false;
}

var moveTo = function(el, moveTime) {
  var pos = el.position();
  $('.archipelago').animate({
    left: (pos.left - ((document.width - el.width()) / 2.0)) * -1,
    top: pos.top * -1 + getTopPadding()
  }, moveTime)
}

var moveArchipelago = function(pos) {
  $('.archipelago').css({
    left: pos[0],
    top: pos[1]
  });
}

var mouseDownArchipelago = function(m) {
  var currentPos = $('.archipelago').position();
  $(window).bind('mousemove', {
    // Data that goes into the object
    mX: m.pageX,
    mY: m.pageY,
    pos: currentPos
  }, function(e) {
    moveArchipelago([(e.data.pos.left + e.pageX - e.data.mX), (e.data.pos.top + e.pageY - e.data.mY)]);
  });
}

var mouseUpArchipelago = function(m) {
  $(window).unbind('mousemove');
  return false;
}

// on-load function
$(function() {
  // Add the click handlers to the nav functions
  $(".nav-link a").click(moveToAnchor);
  // Add the click handlers to each div
  $(".island").bind('click', moveToAnchor);
  // Navigate to the hashed island
  if(document.location.hash != "") {
    moveTo($(document.location.hash), 1);
  } else {
    moveTo($('#main'), 1);
  }
  $(window).bind({
    mousedown: mouseDownArchipelago,
    mouseup: mouseUpArchipelago
  });
});
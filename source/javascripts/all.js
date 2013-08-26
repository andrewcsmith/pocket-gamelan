//= require_tree "./vendor"

var getIslandPosition = function(el) {
  return [parseInt(el.css('left'), 10), parseInt(el.css('top'), 10)];
}

var getTopPadding = function() {
  return parseInt($('.nav').css('height'), 10);
}

var moveToAnchor = function() {
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
  var pos = getIslandPosition(el);
  
  $('.archipelago').animate({
    left: (pos[0] - ((document.width - el.width()) / 2.0)) * -1,
    top: pos[1] * -1 + getTopPadding()
  });
  
  // Change the hash of the current url
  document.location.hash = hash;
  
  return false;
}

$(function() {
  // Add the click handlers to the nav functions
  $(".nav-link a").click(moveToAnchor);
  // Add the click handlers to each div
  $(".island").click(moveToAnchor);
  // $(".island").click(function() {});
});
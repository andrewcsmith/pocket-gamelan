//= require "./vendor/jquery-1.10.2.js"
//= require "./vendor/jquery.mobile.custom.js"
//= require "./elements/functions.js.coffee"

(function() {
  var config = {
    active: function() {
      goToHashedIsland();
    },
    kitId: 'ofu5wmi',
    scriptTimeout: 3000
  };
  var h=document.getElementsByTagName("html")[0];h.className+=" wf-loading";var t=setTimeout(function(){h.className=h.className.replace(/(\s|^)wf-loading(\s|$)/g," ");h.className+=" wf-inactive"},config.scriptTimeout);var tk=document.createElement("script"),d=false;tk.src='//use.typekit.net/'+config.kitId+'.js';tk.type="text/javascript";tk.async="true";tk.onload=tk.onreadystatechange=function(){var a=this.readyState;if(d||a&&a!="complete"&&a!="loaded")return;d=true;clearTimeout(t);try{Typekit.load(config)}catch(b){}};var s=document.getElementsByTagName("script")[0];s.parentNode.insertBefore(tk,s)
})();

var getTopPadding = function() {
  return parseInt($('.nav').css('height'), 10);
}

var goToHashedIsland = function() {
  if(document.location.hash != "") {
    moveTo($(document.location.hash), 1);
  } else {
    moveTo($('#main'), 1);
  }
}

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

var constrainPosition = function(pos) {
  if (pos.left > 0) { pos.left = 0 }
  if ((pos.left * -1.0) > ($('.archipelago').width() - $(document).width())) { pos.left = (($('.archipelago').width() - $(document).width()) * -1.0); }
  if (pos.top > 0) { pos.top = 0 }
  if ((pos.top * -1.0) > ($('.archipelago').height() - $(document).height())) { pos.top = (($('.archipelago').height() - $(document).height()) * -1.0); }
  return pos;
}

var moveTo = function(el, moveTime) {
  el.scrollTop(0);
  var w = el.width() + parseInt(el.css('padding-left'), 10) + parseInt(el.css('padding-right'), 10);
  var h = el.height() + parseInt(el.css('padding-top'), 10) + parseInt(el.css('padding-bottom'), 10);
  var pos = {
    left: (el.position().left - (($(document).width() - w) / 2.0)) * -1,
    top: (el.position().top - (($(document).height() - h) / 2.0)) * -1 // + getTopPadding()
  }
  pos = constrainPosition(pos);
  $('.archipelago').animate({
    left: pos.left,
    top: pos.top
  }, moveTime)
}

var moveArchipelago = function(pos) {
  pos = constrainPosition(pos);
  $('.archipelago').css({
    left: pos.left,
    top: pos.top
  });
}

var mouseDownArchipelago = function(m) {
  // console.log("Mouse down!");
  var currentPos = $('.archipelago').position();
  $('.archipelago').bind('vmousemove', {
    // Data that goes into the object
    mX: m.pageX,
    mY: m.pageY,
    pos: currentPos
  }, function(e) {
    var x = e.data.pos.left + e.pageX - e.data.mX;
    var y = e.data.pos.top + e.pageY - e.data.mY;
    moveArchipelago({
      left: x,
      top: y
    });
  });
  
}

var mouseUpArchipelago = function(m) {
  // console.log("Mouse up!");
  $('.archipelago').unbind('vmousemove');
  return false;
}

// on-load function
$(function() {
  // Set jquery move vars so that we don't accidentally move
  $.vmouse.moveDistanceThreshold = 0;
  $.vmouse.resetTimerDuration = 200;
  
  // Add the click handlers to the links
  $("a[rel='local']").click(moveToAnchor);
  // Add the click handlers to each div
  $(".island").bind('vclick', moveToAnchor);
  // Navigate to the hashed island
  goToHashedIsland();
  $('.archipelago').bind({
    vmousedown: mouseDownArchipelago,
    vmouseup: mouseUpArchipelago,
    mouseenter: mouseUpArchipelago
  });
  $('.island').scroll(mouseUpArchipelago);
  $('.island').scroll(function() {
    $(this).children('.bg').hide();
    // $(this).css('background-image', 'none');
    // $(this).css('background-color', 'rgba(255, 255, 255, 0.9375)');
    $(this).unbind('scroll');
    $(this).scroll(mouseUpArchipelago);
  });
  $(window).bind('vmouseup', mouseUpArchipelago);
  
  $('.nav-link').bind({
    mouseover: function(){$(this).children('.nav-links').css('display', 'block');},
    mouseout: function(){$(this).children('.nav-links').css('display', 'none');}
  });
  $('.nav-link').children('.nav-links').bind({
    mouseout: function(){$(this).css('display', 'none');}
  });
});
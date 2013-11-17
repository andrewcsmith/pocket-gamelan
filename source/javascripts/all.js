//= require "./vendor/jquery-1.10.2.js"
//= require "./vendor/jquery.mobile.custom.js"
//= require "./vendor/jquery.mousewheel.js"
//= require "./plugins/jquery.easing.1.3.js"

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
    var island = document.location.hash.match(/#\/[^\/]*/)[0].replace(/\//, '');
    moveTo($(island), 1);
  } else {
    moveTo($('#main'), 1);
  }
}

var moveToAnchor = function(e) {
  if ($(this).is("div")) {
    var hash = ("/" + $(this).attr("id"));
    var el = $(this);
  } else {
    // Should be called by a link object
    var hash = this.href.match(/(#.*)$/);
    if(hash.length > 0) {
      hash = hash[1];
    } else {
      console.log(hash);
      return true;
    }
    var island = hash.replace(/#\//, '#').replace(/\/.*$/, ''); // String of the island
    var view = hash.match(/\/([^\/]*$)/)[1];
    // hash.replace(/#/g, '').replace(/\//g, ' #').trim();
    var el = $(island); // jQuery object of the island element
    
    var id = island + "-" + view;
    if ($(id).size() > 0) {
      el.find(".view").removeClass("active");
      el.find(id).addClass("active");
      el.find(".nav-link").removeClass("active");
      el.find(id + "-island-menu").addClass("active");
    }
  }
  // el should be a jQuery object of the element to move to
  moveTo(el);
  // Change the hash of the current url
  document.location.hash = hash;
  // Do not implement default behavior of the click
  return false;
}

var constrainPosition = function(pos) {
  if (pos.left > 0) { pos.left = 0 }
  if ((pos.left * -1.0) > ($('.archipelago').width() - $(document).width())) { pos.left = (($('.archipelago').width() - $(document).width()) * -1.0); }
  if (pos.top > 0) { pos.top = 0 }
  if ((pos.top * -1.0) > ($('.archipelago').height() - $(document).height())) { pos.top = (($('.archipelago').height() - $(document).height()) * -1.0); }
  return pos;
}

var constrainMoveTo = function(el) {
  var w = el.width() + parseInt(el.css('padding-left'), 10) + parseInt(el.css('padding-right'), 10);
  var h = el.height() + parseInt(el.css('padding-top'), 10) + parseInt(el.css('padding-bottom'), 10);
  var pos = {
    left: (el.position().left - (($(document).width() - w) / 2.0)) * -1,
    top: (el.position().top - (($(document).height() - h) / 2.0)) * -1
  }
  if (pos.top * -1.0 > el.position().top - 48) {
    pos.top = (el.position().top - 48) * -1.0;
  }
  if (isMobile()) {
    pos.top = pos.top - 30;
  }
  return pos;
}

var moveTo = function(el, moveTime) {
  el.scrollTop(0);
  var pos = constrainMoveTo(el);
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

var isMobile = function() {
  return $(".island").css("width") == "304px";
}

var getCurrentPos = function() {
  return $('.archipelago').position();
}

var mouseDownArchipelago = function(m) {
  if(isMobile()) { return true; }
  $('.archipelago').bind('vmousemove', {
    // Data that goes into the object
    mX: m.pageX,
    mY: m.pageY,
    pos: getCurrentPos()
  }, function(e) {
    var x = e.data.pos.left + e.pageX - e.data.mX;
    var y = e.data.pos.top + e.pageY - e.data.mY;
    // if(isMobile()) { x = e.data.pos.left; y = e.data.pos.top; }
    moveArchipelago({
      left: x,
      top: y
    });
  });
  //if(isMobile()) { return false; }
}

var mouseUpArchipelago = function(m) {
  // console.log("Mouse up!");
  $('.archipelago').unbind('vmousemove');
  return false;
}

var hideNavMenus = function() {
  $('.nav-links > .nav-link').hide();
}

var scrollArchipelago = function(event, delta, deltaX, deltaY) {
  // console.log(delta, deltaX, deltaY);
  $(event.target).addClass("scrolling");
  var content = $('.content:has(.scrolling)').get(0);
  if(content && content.clientHeight < content.scrollHeight) {
    $(event.target).removeClass("scrolling");
    // console.log('' + deltaX + ' ' + deltaY);
    // console.log(content.scrollTop);
    if(content.scrollTop > 0 && deltaY > 0) {
      // allow scrolling to happen
      return true; 
    } else if(content.scrollTop + content.clientHeight < content.scrollHeight && deltaY < 0) {
      return true;
    }
  }
  var pos = getCurrentPos();
  moveArchipelago({
    left: deltaX + pos.left,
    top: (deltaY) + pos.top
  });
  $(event.target).removeClass("scrolling");
  return false;
}

// on-load function
$(function() {
  // Set jquery move vars so that we don't accidentally move
  $.vmouse.moveDistanceThreshold = 0;
  $.vmouse.resetTimerDuration = 200;
  
  // Add the click handlers to the links
  $("a").bind('vclick', moveToAnchor);
  // Add the click handlers to each div
  $(".island").bind('vclick', moveToAnchor);
  // Navigate to the hashed island
  goToHashedIsland();
  
  $('.archipelago').bind({
    vmousedown: mouseDownArchipelago,
    vmouseup: mouseUpArchipelago,
    mouseenter: mouseUpArchipelago
  });
  $(window).bind({
    vmouseup: mouseUpArchipelago,
    vclick: hideNavMenus,
    mousewheel: scrollArchipelago
  });
  
  $('.nav-link').bind({
    vmouseover: function(){$(this).children('.nav-links').show(); return true;},
    vmouseout: function(){$(this).children('.nav-links').hide();}
    // vclick: function(){$(this).children('.nav-links').children('a').hide();}
  });
  $('.nav-link').children('.nav-links').bind({
    vmouseout: function(){$(this).hide();}
    // vclick: function(){$(this).hide();}
  });
  
  if(isMobile()) {
    $('.island').css('max-height', window.innerHeight - 70);
  }
});

// $(document).ready(function(){
//   $('.bxslider').bxSlider();
// });

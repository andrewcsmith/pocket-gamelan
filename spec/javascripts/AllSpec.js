//= require all.js
//= require_tree .

describe("Pocket Gamelan", function() {
  beforeEach(function() {
    loadFixtures("clickFixture.html");
    loadStyleFixtures("clickFixture.css");
    // This makes the jQuery .animate function happen immediately
    jQuery.fx.off = true;
  })
  
  it("has an island", function() {
    expect($('.island')).toBeVisible();
  });

  it("matches a gamelan", function() {
    expect($('.island#gamelan')).toHaveCss({position: 'fixed', left: '512px'})
  });
  
  describe("getIslandPosition(element)", function() {
    var el, gamelanSpy;
    
    beforeEach(function() {
      el = $('.island#gamelan'); // have to keep calling same jQuery object
      gamelanSpy = spyOn(el, 'css').andCallThrough(); // spy on it
    });
    
    it("gets island position", function() {
      expect(getIslandPosition(el)).toEqual([512, 0]);
    });
  
    it("calls css with top and left", function() {
      getIslandPosition(el);
      expect(el.css).toHaveBeenCalledWith('top');
      expect(el.css).toHaveBeenCalledWith('left');
    });
  });
  
  describe("getTopPadding()", function() {
    it("has top padding", function() {
      expect(getTopPadding()).toEqual(48)
    });
  });
  
  describe("moveToAnchor()", function() {
    beforeEach(function() {
      // Track calls to the global window moveToAnchor function
      var moveSpy = spyOn(window, 'moveToAnchor').andCallThrough();
      // Load the click handler
      $('.nav-link a').click(moveToAnchor);
    });
  
    it("triggers the click", function() {
      var spyEvent = spyOnEvent('.nav-link a', 'click');
      $('.nav-link a').click();
      expect('click').toHaveBeenTriggeredOn('.nav-link a');
      expect(spyEvent).toHaveBeenTriggered();
    });
  
    it("calls the anchor mover", function() {
      $('.nav-link a').click();
      expect(window.moveToAnchor).toHaveBeenCalled();
    });
  
    it("moves the archipelago", function() {
      $('.nav-link a[href="#gamelan"]').click();
      expect($('.archipelago')).toHaveCss({left: "-512px"});
    })
  
    afterEach(function() {
      // Reset the hash
      document.location.hash = '';
    })
  });
});

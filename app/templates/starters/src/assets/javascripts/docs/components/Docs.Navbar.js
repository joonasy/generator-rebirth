/* ========================================
 * Docs navbar
 * ======================================== */

var Docs = Docs || {};

Docs.Navbar = function($) {

  var self = {};

  self.init = function() {
    var $navBar = $('#js-docs-Navbar'),
        $navBarTrigger = $('#js-docs-Navbar-trigger', $navBar),
        $navItem = $('.Navbar-item', $navBar),
        $navLink = $('.Navbar-link', $navBar),
        $navSubTrigger = $('.Navbar-subTrigger', $navBar);

    App.Toggle({
      trigger: $navBarTrigger,
      element: $navBar
    });

    App.Toggle({
      trigger: $navSubTrigger,
      element: $navItem,
      toggleParent: true,
      unToggleParentSiblings: true,
      unToggleOtherToggles: false
    });

    App.Toggle({
      trigger: $navLink,
      element: $navItem,
      toggleParent: true,
      unToggleParentSiblings: true,
      disableFirstClickOnTouch: $navSubTrigger
    });
  }

  return {
    init: self.init
  }
}(jQuery);
/* ========================================
 * Toggle (beta)
 * ======================================== */

'use strict';

var $ = require('jquery');
var toggleObjects = [];

var toggle = function(options) {
  var config;
  var self = {};

  config = $.extend({
    trigger: $(),
    triggerClass: false,
    element: $(),
    elementClass: 'is-open',
    elementStopPropagation: true,
    toggleClosest: false,
    disableFirstClickOnTouch: false,
    unToggleParentSiblings: false,
    unToggleOtherToggles: true,
    unTogglable: true
  }, options);

  self.init = function() {
    toggleObjects.push(config);
    config.trigger.on('click', clickTrigger);

    if (config.elementStopPropagation) {
      config.element.on('click', function(e) {
        e.stopPropagation();
      });
    }
  }

  var clickTrigger = function(e) {
    var $this = $(this);
    var isToggled;

    if (config.unToggleOtherToggles) {

      if (config.toggleClosest) {
        isToggled = !$this.closest(config.element).hasClass(config.elementClass);
      } else if (!config.toggleClosest) {
        isToggled = !config.element.hasClass(config.elementClass);
      }

      if (isToggled) {
        self.removeToggles();
      }
    }

    var firstClick = $this.hasClass('is-firstTouch');

    if (config.disableFirstClickOnTouch && !firstClick && Modernizr.touchevents) {

      $this.addClass('is-firstTouch')
      e.preventDefault();

      setTimeout(function() {
        $this.removeClass('is-firstTouch')
      }, 1000);
    }

    if (config.toggleClosest) {
      $this.each(function() {
        $this
          .closest(config.element)
          .toggleClass(config.elementClass);
      });
    } else {
      config.element.toggleClass(config.elementClass);
    }

    if (config.unToggleParentSiblings) {
      $this.each(function() {
        $this
          .parent()
          .siblings(config.element)
          .removeClass(config.elementClass);
      });
    }

    if (config.triggerClass) {
      $this.toggleClass(config.triggerClass);
    }

    if (!config.disableFirstClickOnTouch) {
      e.preventDefault();
    }

    e.stopPropagation();
  };

  self.removeToggles = function() {
    $.each(toggleObjects, function(index, value) {
      value.element.each(function() {
        if (!$(this).hasClass(value.elementClass) || !value.unTogglable) {
          return
        }

        $(this).removeClass(value.elementClass);

      });

      if (value.triggerClass) {
        value.trigger.removeClass(value.triggerClass);
      }
    });
  };

  return {
    init: config.trigger.length ? self.init() : false,
    removeToggles: self.removeToggles
  }
};

$(window).on('click', function(e) {
  toggle().removeToggles();
});

module.exports = toggle;
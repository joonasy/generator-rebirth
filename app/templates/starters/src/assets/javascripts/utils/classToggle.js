/* ========================================
 * Class toggle (beta)
 * ======================================== */

'use strict'

import $ from 'jquery';
import Modernizr from 'modernizr';

const classToggles = [];

export default function classToggle(options) {

  let config = $.extend({
    trigger: '',
    triggerClass: '',
    element: '',
    elementClass: 'is-open',
    elementStopPropagation: false,
    toggleClosest: false,
    disableFirstClickOnTouch: false,
    unToggleParentSiblings: false,
    unToggleOtherToggles: true,
    unTogglable: true,
    afterClick: function() {},
  }, options);

  const $trigger = $(config.trigger);
  const $element = $(config.element);

  let init = () => {
    classToggles.push(config);

    $(document).on('click', config.trigger, function(e) {
      _clickTrigger(e, $(this));
    });

    if (config.elementStopPropagation) {
      let $el = $element;

      if (config.elementStopPropagation instanceof jQuery ||
          typeof config.elementStopPropagation === 'string') {
        $el = $(config.elementStopPropagation);
      }

      $el.on('click', (e) => {
        e.stopPropagation();
      });
    }
  }

  let _clickTrigger = (e, selector) => {
    const $this = $(selector);

    const firstClick = $this.hasClass('is-firstTouch');

    if (config.disableFirstClickOnTouch && !firstClick && Modernizr.touchevents) {
      $this.addClass('is-firstTouch')
      e.preventDefault();
      setTimeout(() => {
        $this.removeClass('is-firstTouch')
      }, 1000);
    }

    if(config.element) {
      if(config.unToggleOtherToggles) {
        removeToggles($element);
      }

      if (!config.toggleClosest) {
        $element.toggleClass(config.elementClass);
      } else {
        $this.closest($element).toggleClass(config.elementClass);
      }

      if (config.unToggleParentSiblings) {
        $this.parent().siblings($element).removeClass(config.elementClass);
      }
    }

    if (config.triggerClass) {
      if (config.unToggleOtherToggles) {
        removeToggles($this);
      }

      $this.toggleClass(config.triggerClass);
    }

    if (!config.disableFirstClickOnTouch) {
      e.preventDefault();
    }

    config.afterClick();
    e.stopPropagation();
  };

  let removeToggles = (currentNode) => {
    classToggles.forEach(value => {
      if (value.element && value.unTogglable) {
        const $el = $(value.element);

        $el.each(function() {
          const isToggled = $(this).hasClass(value.elementClass);
          const currentEl = $(this).is(currentNode);

          if (!currentEl && isToggled) {
            $(this).removeClass(value.elementClass);
          }
        });
      }

      if (value.triggerClass && value.unTogglable) {
        const $trigger = $(value.trigger);

        $trigger.each(function() {
          const isToggled = $(this).hasClass(value.triggerClass);
          const currentTrigger = $(this).is(currentNode);

          if (!currentTrigger && isToggled) {
            $(this).removeClass(value.triggerClass);
          }
        });
      }
    });
  };

  return {
    init: config.trigger.length ? init() : false,
    removeToggles: removeToggles
  }
};

$(window).on('click', function() {
  classToggle().removeToggles();
});

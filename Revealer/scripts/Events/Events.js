'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* eslint-disable no-param-reassign */

var Events = function () {
  function Events() {
    _classCallCheck(this, Events);

    this.events = [];
  }

  _createClass(Events, [{
    key: 'add',
    value: function add(event) {
      if (!event.data) {
        event.data = null;
      }

      if (event.element) {
        $(document).on(event.event, event.element, event.data, event.handler);
      }

      if (!event.element) {
        if (event.event === 'ready') {
          $(document).ready(event.handler);
        } else {
          $(document).on(event.event, event.handler);
        }
      }

      this.events.push(event);

      return this.events;
    }
  }]);

  return Events;
}();

exports.default = Events;
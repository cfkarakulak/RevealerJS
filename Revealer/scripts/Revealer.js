'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */

var _Defaults = require('./Helpers/Defaults');

var _Defaults2 = _interopRequireDefault(_Defaults);

var _Events = require('./Events/Events');

var _Events2 = _interopRequireDefault(_Events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Revealer = function () {
  function Revealer(options) {
    var _this = this;

    _classCallCheck(this, Revealer);

    this.settings = $.extend({}, _Defaults2.default, options);

    var events = new _Events2.default();
    var act = [];

    $(this.settings.selector).each(function (i, el) {
      var data = Revealer.explode($(el).data('reveal'));

      if (!act[data.on]) {
        events.add({
          element: '[data-reveal]',
          data: {
            config: data
          },
          event: data.on,
          handler: _this.reveal
        });

        act[data.on] = true;
      }

      if (data.off && !act[data.off]) {
        events.add({
          element: '[data-reveal]',
          data: {
            config: data
          },
          event: data.off,
          handler: _this.conceal
        });

        act[data.off] = true;
      }
    });
  }

  _createClass(Revealer, [{
    key: 'reveal',
    value: function reveal(event) {
      var args = event.data;

      if (args.config.on !== event.type) {
        return false;
      }

      return $('body').addClass('reveal');
    }
  }, {
    key: 'conceal',
    value: function conceal(event) {
      var args = event.data;

      if (args.config.off !== event.type) {
        return false;
      }

      return $('body').removeClass('reveal');
    }
  }], [{
    key: 'explode',
    value: function explode(config) {
      var on = config.includes('on:') ? config.match(/on:\((.*?)\)/)[1] : false;
      var off = config.includes('off:') ? config.match(/off:\((.*?)\)/)[1] : false;

      return { on: on, off: off };
    }
  }]);

  return Revealer;
}();

exports.default = Revealer;
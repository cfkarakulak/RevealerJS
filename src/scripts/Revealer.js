/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */

import Defaults from './Helpers/Defaults';
import Events from './Events/Events';

export default class Revealer {
  constructor(options) {
    this.settings = $.extend({}, Defaults, options);

    const events = new Events();
    const act = [];

    $(this.settings.selector).each((i, el) => {
      const data = Revealer.explode($(el).data('reveal'));

      if (!act[data.on]) {
        events.add({
          element: '[data-reveal]:not(.void)',
          data: {
            config: data,
          },
          event: data.on,
          handler: this.reveal,
        });

        act[data.on] = true;
      }

      if (data.off && !act[data.off]) {
        events.add({
          element: '[data-reveal]:not(.void)',
          data: {
            config: data,
          },
          event: data.off,
          handler: this.conceal,
        });

        act[data.off] = true;
      }
    });
  }

  reveal(event) {
    const args = Revealer.explode($(this).data('reveal'));

    if (args.on !== event.type) {
      return false;
    }

    if (args.wait) {
      window.revealerJSTimer = setTimeout(() => {
        $('body').addClass('reveal');
      }, Number(args.wait));
    }

    if (!args.wait) {
      $('body').addClass('reveal');
    }

    return args;
  }

  conceal(event) {
    const args = Revealer.explode($(this).data('reveal'));

    if (args.off !== event.type) {
      return false;
    }

    clearTimeout(window.revealerJSTimer);

    return $('body').removeClass('reveal');
  }

  static explode(config) {
    const on = config.includes('on:') ? config.match(/on:\((.*?)\)/)[1] : false;
    const off = config.includes('off:') ? config.match(/off:\((.*?)\)/)[1] : false;
    const wait = config.includes('wait:') ? config.match(/wait:\((.*?)\)/)[1] : false;

    return { on, off, wait };
  }
}
